import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import Signin from '../components/modal-content/signin';
import Signup from '../components/modal-content/signup';
import ProfileControl from '../components/modal-content/profile-control';
import SigninBar from '../components/signin-bar';
import JobsTable from '../components/jobs-table';
import NewJobPosting from '../components/new-job-posting';
import {
  MODAL_TRANSITION,
  MODAL_PROFILE_CONTENT,
  MODAL_CONTENT,
  modal_s,
} from '../utils/constants';
import { hiring_table_posts_ref, db, firebase } from '../utils/db';
import { query_my_hiring_post_submissions, obj_to_array } from '../utils/funcs';

const SUBMIT_NEW_JOB = 'Submit new Job';

const PAGE_CONTENT = { HIRING_TABLE: 'hiring-table', NEW_HIRING_POST: 'new-hiring-post' };

export default class HiringBoardPage extends React.Component {
  state = {
    modal_show: false,
    modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    page_content: PAGE_CONTENT.HIRING_TABLE,
    jobs: [],
    my_hiring_submissions: [],
  };

  static contextTypes = {
    authenticated_user: PropTypes.object,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
    submit_new_hiring_post: PropTypes.func,
  };

  query_data = () => hiring_table_posts_ref.once('value').then(snap_shot => snap_shot.val());

  componentDidMount() {
    this.query_data().then(rows => this.setState(() => ({ jobs: rows ? obj_to_array(rows) : [] })));
  }

  toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

  delete_a_job_posting = post_key => {
    const current_user = firebase.auth().currentUser;
    const updates = {};
    updates[`/hiring-table-posts/${post_key}`] = null;
    updates[`/users/${current_user.uid}/my-hiring-board-submissions/${post_key}`] = null;
    return db
      .ref()
      .update(updates)
      .then(reply =>
        this.query_data().then(rows =>
          query_my_hiring_post_submissions().then(my_hiring_submissions =>
            this.setState(() => ({
              jobs: rows ? obj_to_array(rows) : [],
              my_hiring_submissions: my_hiring_submissions
                ? obj_to_array(my_hiring_submissions)
                : [],
            }))
          )
        )
      )
      .catch(error => console.warn(error));
  };

  user_did_sign_in = () => {
    query_my_hiring_post_submissions()
      .then(rows => {
        return this.setState(() => ({
          modal_show: false,
          my_hiring_submissions: rows ? obj_to_array(rows) : [],
        }));
      })
      .catch(error => console.log(error));
  };

  user_did_sign_up = () => {
    this.setState(() => ({ modal_show: false }));
  };

  modal_content = () => {
    let content = null;
    switch (this.state.modal_content) {
      case MODAL_CONTENT.SIGNIN_VIEW:
        content = (
          <Signin
            login_message={'Sign in'}
            sign_user_in={this.context.sign_user_in}
            user_did_sign_in={this.user_did_sign_in}
          />
        );
        break;
      case MODAL_CONTENT.PROFILE_VIEW:
        content = (
          <ProfileControl
            delete_hiring_record={this.delete_a_job_posting}
            authenticated_user={this.context.authenticated_user}
            profile_content={MODAL_PROFILE_CONTENT.HIRING_BOARD_LISTINGS}
            my_hiring_submissions={this.state.my_hiring_submissions}
          />
        );
        break;
      case MODAL_CONTENT.SIGNUP_VIEW:
        content = <Signup user_did_sign_up={this.user_did_sign_up} />;
        break;
      default:
        throw new Error(`Unknown modal content requested: ${this.state.modal_content}`);
    }
    return <div className={'ModalContentWrapper'}>{content}</div>;
  };

  new_tech_job_post_did_finish = () => {
    this.query_data().then(rows =>
      query_my_hiring_post_submissions().then(my_submissions =>
        this.setState(() => ({
          page_content: PAGE_CONTENT.HIRING_TABLE,
          jobs: rows ? obj_to_array(rows) : [],
          my_hiring_submissions: my_submissions ? obj_to_array(rows) : [],
        }))
      )
    );
  };

  page_content = () => {
    switch (this.state.page_content) {
      case PAGE_CONTENT.HIRING_TABLE:
        return <JobsTable all_jobs={this.state.jobs} />;
      case PAGE_CONTENT.NEW_HIRING_POST:
        return (
          <NewJobPosting
            new_tech_job_post_did_finish={this.new_tech_job_post_did_finish}
            submit_new_hiring_post={this.context.submit_new_hiring_post}
          />
        );
      default:
        console.error(`Unknown page requested on hiring board page ${this.state.page_content}`);
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

  toggle_hiring_content = () =>
    this.setState(prev_state => ({
      page_content:
        prev_state.page_content === PAGE_CONTENT.NEW_HIRING_POST
          ? PAGE_CONTENT.HIRING_TABLE
          : PAGE_CONTENT.NEW_HIRING_POST,
    }));

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
          contentLabel="yerevancoder">
          {this.modal_content()}
        </Modal>
        <nav className={'AvailableForWorkContainer__NavTopRow'}>
          <h4 className={'AvailableForWorkContainer__PageBanner'}>Get hired now</h4>
          <SigninBar
            signin_handler={this.signin_handler}
            signup_handler={this.signup_handler}
            signout_handler={sign_user_out}
            signed_in_handler={this.show_my_posting}
            is_signed_in={authenticated_user !== null}
            when_active_name={authenticated_user ? authenticated_user.email : ''}
            custom_input_handler_signedin={this.toggle_hiring_content}
            custom_input_handler_signedout={() => undefined}
            custom_input_signed_in_name={
              this.state.page_content === PAGE_CONTENT.NEW_HIRING_POST ? 'Jobs' : SUBMIT_NEW_JOB
            }
            custom_input_signed_out_name={SUBMIT_NEW_JOB}
          />
        </nav>
        {this.page_content()}
      </div>
    );
  }
}
