import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import Signin from '../components/signin';
import Signup from '../components/signup';
import Profile from '../components/profile';
import SigninBar from '../components/signin-bar';
import NewFreelancer from '../components/new-freelancer';
import FreelancerTable from '../components/freelancer-table';
import { MODAL_TRANSITION, MODAL_PROFILE_CONTENT } from '../utils/constants';
import { freelancers_posts_ref, db, firebase } from '../utils/db';
import { query_my_freelance_submission } from '../utils/funcs';

const ADD_YOURSELF = 'Add yourself';

const modal_s = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const MODAL_CONTENT = {
  PROFILE_VIEW: 'profile-view',
  SIGNIN_VIEW: 'signin-view',
  SIGNUP_VIEW: 'signup-view',
};

const PAGE_CONTENT = { FREELANCER_TABLE: 'freelancer-table', NEW_FREELANCER: 'new-freelancer' };

export default class AvailableForWorkPage extends React.Component {
  state = {
    modal_show: false,
    modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    page_content: PAGE_CONTENT.FREELANCER_TABLE,
    freelancers: [],
    self_freelance_posting: null,
  };

  static contextTypes = {
    authenticated_user: PropTypes.object,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
  };

  query_data = () => freelancers_posts_ref.once('value').then(snap_shot => snap_shot.val());

  componentDidMount() {
    this.query_data().then(rows =>
      this.setState(() => ({
        freelancers: rows ? Object.values(rows) : [],
      }))
    );
  }

  toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

  delete_my_freelance_posting = () => {
    if (this.state.self_freelance_posting) {
      const { post_key } = this.state.self_freelance_posting;
      const current_user = firebase.auth().currentUser;
      db
        .ref(`users/${current_user.uid}/my-freelance-submission`)
        .remove()
        .then(() => freelancers_posts_ref.child(post_key).remove())
        .then(() =>
          this.query_data().then(rows =>
            this.setState(() => ({
              self_freelance_posting: null,
              modal_show: false,
              page_content: PAGE_CONTENT.FREELANCER_TABLE,
              freelancers: rows ? Object.values(rows) : [],
            }))
          )
        )
        .catch(error => console.log(error));
    }
  };

  user_did_sign_in = () => {
    query_my_freelance_submission()
      .then(self_freelance_posting =>
        this.setState(() => ({ modal_show: false, self_freelance_posting }))
      )
      .catch(error => console.log(error));
  };

  modal_content = () => {
    switch (this.state.modal_content) {
      case MODAL_CONTENT.SIGNIN_VIEW:
        return (
          <Signin
            login_message={'Sign in'}
            sign_user_in={this.context.sign_user_in}
            user_did_sign_in={this.user_did_sign_in}
          />
        );
      case MODAL_CONTENT.PROFILE_VIEW:
        return (
          <Profile
            profile_content={MODAL_PROFILE_CONTENT.FREELANCER_POSTING}
            self_freelance_posting={this.state.self_freelance_posting}
            delete_my_freelance_posting={this.delete_my_freelance_posting}
            force_query={this.query_data}
          />
        );
      case MODAL_CONTENT.SIGNUP_VIEW:
        return <Signup user_did_sign_in={this.user_did_sign_in} />;
      default:
        return null;
    }
  };

  freelancer_post_did_finish = () => {
    this.query_data().then(rows =>
      query_my_freelance_submission().then(self_freelance_posting =>
        this.setState(() => ({
          self_freelance_posting,
          page_content: PAGE_CONTENT.FREELANCER_TABLE,
          freelancers: rows ? Object.values(rows) : [],
        }))
      )
    );
  };

  page_content = () => {
    switch (this.state.page_content) {
      case PAGE_CONTENT.FREELANCER_TABLE:
        return <FreelancerTable freelancers={this.state.freelancers} />;
      case PAGE_CONTENT.NEW_FREELANCER:
        return (
          <NewFreelancer
            freelancer_post_did_finish={this.freelancer_post_did_finish}
            submit_new_freelancer_post={this.context.submit_new_freelancer_post}
          />
        );
      default:
        return null;
    }
  };

  signin_handler = () =>
    this.setState(() => ({
      modal_show: true,
      modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    }));

  signup_handler = () =>
    this.setState(() => ({
      modal_show: true,
      modal_content: MODAL_CONTENT.SIGNUP_VIEW,
    }));

  show_make_new_freelancer_post = () =>
    this.setState(() => ({ page_content: PAGE_CONTENT.NEW_FREELANCER }));

  show_my_posting = () => {
    this.setState(() => ({ modal_show: true, modal_content: MODAL_CONTENT.PROFILE_VIEW }));
  };

  render() {
    const { authenticated_user, sign_user_out } = this.context;
    return (
      <div className={'AvailableForWorkContainer'}>
        <Modal
          closeTimeoutMS={MODAL_TRANSITION}
          isOpen={this.state.modal_show}
          onRequestClose={this.toggle_modal}
          ariaHideApp={false}
          style={modal_s}
          contentLabel="Signin to Yerevancoder">
          {this.modal_content()}
        </Modal>
        <nav className={'AvailableForWorkContainer__NavTopRow'}>
          <h4 className={'AvailableForWorkContainer__PageBanner'}>
            Freelance programmers in Armenia
          </h4>
          <SigninBar
            signin_handler={this.signin_handler}
            signup_handler={this.signup_handler}
            signout_handler={sign_user_out}
            signed_in_handler={this.show_my_posting}
            is_signed_in={authenticated_user !== null}
            when_active_name={authenticated_user ? authenticated_user.email : ''}
            custom_input_handler_signedin={this.show_make_new_freelancer_post}
            custom_input_handler_signedout={null}
            custom_input_signed_in_name={ADD_YOURSELF}
            custom_input_signed_out_name={ADD_YOURSELF}
          />
        </nav>
        {this.page_content()}
      </div>
    );
  }
}
