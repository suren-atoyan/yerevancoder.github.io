import React from 'react';
import Link from 'gatsby-link';
import addDays from 'date-fns/add_days';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { rhythm } from '../utils/typography';
import JobsTable from '../components/jobs-table';
import Signin from '../components/signin';
import Signup from '../components/signup';
import { posts_ref } from '../utils/db';
import {
  ROW,
  TEXT_S,
  DISPLAY_FLEX_S,
  ROUTES,
  SPACER_30_H,
  MODAL_TRANSITION,
} from '../utils/constants';

const banner_s = { ...ROW, maxHeight: '30px' };

const s = { marginTop: rhythm(1.5) };

const post_new_s = { border: 0 };

const horizontal_spacer = <div style={{ width: '10px' }} />;

const modal_s = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    transform: 'translate(-50%, -50%)',
  },
};

const MODAL_CONTENT = {
  PROFILE_VIEW: 'profile-view',
  SIGNIN_VIEW: 'signin-view',
  SIGNUP_VIEW: 'signup-view',
};

export default withRouter(
  class HiringBoard extends React.Component {
    state = {
      jobs: [],
      modal_show: false,
      modal_content: null,
      user_email_account: this.context.authenticated_user
        ? this.context.authenticated_user.email_account
        : null,
    };

    // state = {
    //   jobs: [],
    //   modal_show: true,
    //   modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    //   user_email_account: this.context.authenticated_user
    //     ? this.context.authenticated_user.email_account
    //     : null,
    // };

    static contextTypes = {
      authenticated_user: PropTypes.object,
      do_signout: PropTypes.func,
    };

    toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

    shouldComponentUpdate(prev_state, next_state) {
      console.log({ prev_state, next_state });
      return true;
    }

    go_to_new_posting = () => {
      const { history } = this.props;
      history.push(ROUTES.NEW_JOB_POSTING);
    };

    componentDidMount() {
      posts_ref.once('value', snap_shot => {
        const rows = snap_shot.val();
        if (rows) {
          this.setState(() => ({ jobs: Object.values(rows) }));
        }
      });
    }

    user_did_sign_in = user_email_account => {
      this.setState(() => ({ user_email_account, modal_show: false }));
    };

    modal_content = () => {
      switch (this.state.modal_content) {
        case MODAL_CONTENT.PROFILE_VIEW:
          return <p>TODO - SOMEONE MAKE A PROFILE VIEW</p>;
        case MODAL_CONTENT.SIGNIN_VIEW:
          return <Signin user_did_sign_in={this.user_did_sign_in} />;
        case MODAL_CONTENT.SIGNUP_VIEW:
          return <Signup user_did_sign_in={this.user_did_sign_in} />;
        default:
          return null;
      }
    };

    show_profile_modal = () => {
      this.setState(({ modal_show }) => ({
        modal_show: !modal_show,
        modal_content: MODAL_CONTENT.PROFILE_VIEW,
      }));
    };

    show_signin_modal = () => {
      this.setState(({ modal_show }) => ({
        modal_show: !modal_show,
        modal_content: MODAL_CONTENT.SIGNIN_VIEW,
      }));
    };

    show_signup_modal = () => {
      this.setState(({ modal_show }) => ({
        modal_show: !modal_show,
        modal_content: MODAL_CONTENT.SIGNUP_VIEW,
      }));
    };

    do_signout = () => {
      this.setState(() => ({ user_email_account: null }));
      this.context.do_signout();
    };

    render() {
      const has_account = this.state.user_email_account !== null;
      const signup_or_logged_in = (
        <input
          onClick={has_account ? this.show_profile_modal : this.show_signup_modal}
          style={post_new_s}
          type={'button'}
          value={has_account ? this.state.user_email_account : 'Signup'}
        />
      );
      const signin_or_signout = (
        <input
          onClick={has_account ? this.do_signout : this.show_signin_modal}
          style={post_new_s}
          type={'button'}
          value={has_account ? 'Signout' : 'Signin'}
        />
      );

      return (
        <section style={s}>
          <Modal
            closeTimeoutMS={MODAL_TRANSITION}
            isOpen={this.state.modal_show}
            onRequestClose={this.toggle_modal}
            ariaHideApp={false}
            style={modal_s}
            contentLabel="Signin to Yerevancoder">
            {this.modal_content()}
          </Modal>
          <div style={banner_s}>
            <p style={TEXT_S}>Get hired now</p>
            <div style={DISPLAY_FLEX_S}>
              <input
                onClick={this.go_to_new_posting}
                style={post_new_s}
                type={'button'}
                value={'Post New'}
                disabled={!has_account}
              />
              {horizontal_spacer}
              {signin_or_signout}
              {horizontal_spacer}
              {signup_or_logged_in}
            </div>
          </div>
          {SPACER_30_H}
          <JobsTable all_jobs={this.state.jobs} />
        </section>
      );
    }
  }
);
