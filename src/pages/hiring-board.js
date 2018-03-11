import React from 'react';
import Link from 'gatsby-link';
import addDays from 'date-fns/add_days';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { rhythm } from '../utils/typography';
import JobsTable from '../components/jobs-table';
import Login from '../components/login';
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

const post_new_s = { borderRadius: 20 };

const horizontal_spacer = <div style={{ width: '10px' }} />;

const modal_s = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

const MODAL_CONTENT = {
  PROFILE_VIEW: 'profile-view',
  LOGIN_VIEW: 'login-view',
  SIGNUP_VIEW: 'signup-view',
};

export default withRouter(
  class HiringBoard extends React.Component {
    // state = { jobs: [], modal_show: false, modal_content: null, user_email_account: null };
    state = {
      jobs: [],
      modal_show: true,
      modal_content: MODAL_CONTENT.LOGIN_VIEW,
      user_email_account: null,
    };

    static contextTypes = {
      authenticated_user: PropTypes.object,
    };

    toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

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
        case MODAL_CONTENT.LOGIN_VIEW:
          return <Login user_did_sign_in={this.user_did_sign_in} />;
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

    show_login_modal = () => {
      this.setState(({ modal_show }) => ({
        modal_show: !modal_show,
        modal_content: MODAL_CONTENT.LOGIN_VIEW,
      }));
    };

    show_signup_modal = () => {
      this.setState(({ modal_show }) => ({
        modal_show: !modal_show,
        modal_content: MODAL_CONTENT.SIGNUP_VIEW,
      }));
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
      return (
        <section style={s}>
          <Modal
            closeTimeoutMS={MODAL_TRANSITION}
            isOpen={this.state.modal_show}
            onRequestClose={this.toggle_modal}
            ariaHideApp={false}
            style={modal_s}
            contentLabel="Login to Yerevancoder">
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
              <input
                onClick={this.show_login_modal}
                style={post_new_s}
                type={'button'}
                value={'Login'}
                disabled={has_account}
              />
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
