import React from 'react';
import Link from 'gatsby-link';
import addDays from 'date-fns/add_days';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { rhythm } from '../utils/typography';
import JobsTable from '../components/jobs-table';
import Login from '../components/login';
import { posts_ref } from '../utils/db';
import { ROW, TEXT_S, DISPLAY_FLEX_S, ROUTES } from '../utils/constants';

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
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const spacer = <div style={{ height: '30px', width: '100%' }} />;

export default withRouter(
  class HiringBoard extends React.Component {
    state = { jobs: [], modal_show: false };

    static contextTypes = {
      authenticated_user: PropTypes.object,
    };

    toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));
    go_to_new_posting = () => {
      const { history } = this.props;
      history.push(ROUTES.NEW_JOB_POSTING);
    };

    async componentDidMount() {
      posts_ref.once('value', snap_shot => {
        const rows = snap_shot.val();
        this.setState(() => ({ jobs: Object.values(rows) }));
      });
    }

    render() {
      return (
        <section style={s}>
          <Modal
            isOpen={this.state.modal_show}
            onRequestClose={this.toggle_modal}
            ariaHideApp={false}
            style={modal_s}
            contentLabel="Login to Yerevancoder">
            <Login close_container={this.toggle_modal} />
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
                onClick={this.toggle_modal}
                style={post_new_s}
                type={'button'}
                value={'Login'}
                disabled={this.context.authenticated_user !== null}
              />
            </div>
          </div>
          {spacer}

          <JobsTable all_jobs={this.state.jobs} />
        </section>
      );
    }
  }
);
