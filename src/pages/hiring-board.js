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
import { ROW, TEXT_S, DISPLAY_FLEX_S, ROUTES, SPACER_30_H } from '../utils/constants';

const banner_s = { ...ROW, maxHeight: '30px' };

const s = { marginTop: rhythm(1.5) };

const post_new_s = { borderRadius: 20 };

const horizontal_spacer = <div style={{ width: '10px' }} />;

const modal_s = {
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
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
    state = { jobs: [], modal_show: false, modal_content: null };

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

    user_did_signin_successful = () => {
      this.setState(() => ({ modal_content: null, modal_show: false }));
    };

    modal_content = () => {
      switch (this.state.modal_content) {
        case MODAL_CONTENT.PROFILE_VIEW:
          return <p>TODO - SOMEONE MAKE A PROFILE VIEW</p>;
        case MODAL_CONTENT.LOGIN_VIEW:
          return <Login user_did_sign_in={this.user_did_signin_successful} />;
        case MODAL_CONTENT.SIGNUP_VIEW:
          return <Signup />;
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
      let signup_or_logged_in = null;
      if (this.context.authenticated_user === null) {
        signup_or_logged_in = (
          <input
            onClick={this.show_signup_modal}
            style={post_new_s}
            type={'button'}
            value={'Signup'}
          />
        );
      } else {
        signup_or_logged_in = (
          <input
            onClick={this.show_profile_modal}
            style={post_new_s}
            type={'button'}
            value={this.context.authenticated_user.email_account}
          />
        );
      }
      return (
        <section style={s}>
          <Modal
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
                disabled={this.context.authenticated_user === null}
              />
              {horizontal_spacer}
              <input
                onClick={this.show_login_modal}
                style={post_new_s}
                type={'button'}
                value={'Login'}
                disabled={this.context.authenticated_user !== null}
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
