import React from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

import Login from './login';
import { ROUTES } from '../utils/constants';

const posting_s = {
  paddingTop: '2%',
  paddingBottom: '2%',
  boxShadow: '3px 3px 5px 6px #ccc',
  marginBottom: 35,
  borderRadius: 10,
};

const text_s = { fontFamily: 'Montserrat, sans-serif' };

const details_s = { paddingLeft: '2%', paddingRight: '2%' };

const summary_s = { ...text_s, display: 'list-item', cursor: 'grabbing' };

const label_s = { color: 'rgb(127, 127, 127)' };

const row = { display: 'flex', justifyContent: 'space-between' };

const job_description_s = {
  borderWidth: 1,
  borderColor: 'black',
  borderStyle: 'inset',
  padding: '2%',
  backgroundColor: '#f5f5ea',
};

// short job description limited to 180 characters
// job_description limited to 1000 characters
const Posting = ({
  post_date,
  job_location,
  salary_range: { from, to },
  payment_currency,
  post_author,
  job_description,
  short_job_description,
  contact_info,
}) => (
  <div style={posting_s}>
    <details style={details_s}>
      <summary style={summary_s}>{short_job_description}</summary>
      <div style={row}>
        <span style={label_s}>Posted by: {post_author}</span>
        <span style={label_s}>Post date: {format(post_date, 'DD/MMM/YYYY')}</span>
      </div>
      <div style={row}>
        <span style={label_s}>Location: {job_location}</span>
        <span style={label_s}>
          Salary Range, from: {from} to: {to} {payment_currency}
        </span>
      </div>
      <p style={job_description_s}>{job_description}</p>
      <span style={text_s}>Contact: {contact_info}</span>
    </details>
  </div>
);

const banner_s = { ...row, maxHeight: '30px' };

const spacer = <div style={{ height: '30px', width: '100%' }} />;

const post_new_s = { borderRadius: 20 };

const button_cluster_s = { display: 'flex' };

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

export default withRouter(
  class JobsTable extends React.Component {
    state = { modal_show: false };
    static contextTypes = {
      authenticated_user: PropTypes.object,
    };

    toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

    show_login_modal = e => {
      this.setState(() => ({ modal_show: true }));
    };

    go_to_new_posting = () => {
      const { history } = this.props;
      history.push(ROUTES.NEW_JOB_POSTING);
    };

    render() {
      const { all_jobs } = this.props;
      const postings = all_jobs.map(s => (
        <Posting {...s} key={`${s.job_description}/${s.post_author}`} />
      ));
      return (
        <section>
          <Modal
            isOpen={this.state.modal_show}
            onRequestClose={this.toggle_modal}
            ariaHideApp={false}
            style={modal_s}
            contentLabel="Login to Yerevancoder">
            <Login close_container={this.toggle_modal} />
          </Modal>
          <div style={banner_s}>
            <p style={text_s}>Get hired now</p>
            <div style={button_cluster_s}>
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
          {postings}
        </section>
      );
    }
  }
);
