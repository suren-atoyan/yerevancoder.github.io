import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { rhythm } from '../utils/typography';
import { updateByPropertyName, is_number } from '../utils/funcs';
import { db } from '../utils/db';
import { ROUTES, TEXT_S, JOB_POSTING_DESCRIPTION_LIMIT, SUMMARY_LIMIT } from '../utils/constants';

const new_job_page = {
  marginTop: rhythm(1.5),
  backgroundColor: '#f5f5ea',
  paddingBottom: rhythm(1.5),
};

const field_label = { ...TEXT_S, fontSize: 20 };

const field = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
};

const column = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10%',
  marginRight: '10%',
  paddingBottom: '15px',
  paddingTop: '15px',
};

const INIT_STATE = {
  job_location: '',
  payment_currency: 'dram',
  post_author: '',
  job_description: '',
  short_job_description: '',
  contact_info: '',
};

export default withRouter(
  class NewJobPosting extends React.Component {
    static contextTypes = { authenticated_user: PropTypes.object };

    state = { ...INIT_STATE };

    submit_new_job_posting = e => {
      e.preventDefault();
      const { value: salary_from } = this.input_salary_from;
      const { value: salary_to } = this.input_salary_to;
      const { history } = this.props;
      let missing_field = null;
      if (this.is_invalid(k => (missing_field = k))) {
        const { uid: creator_uid } = this.context.authenticated_user;
        const now = new Date();
        const uuid = format(now, 'DD/MMM/YYYY/ss').replace(/\//g, '-');
        const {
          job_description,
          job_location,
          short_job_description,
          post_author,
          payment_currency,
          ...rest
        } = this.state;
        db
          .ref(`posts`)
          .push({
            ...rest,
            payment_currency,
            job_location,
            post_author,
            short_job_description: short_job_description.slice(0, SUMMARY_LIMIT),
            job_description: job_description.slice(0, JOB_POSTING_DESCRIPTION_LIMIT),
            creation_time: now.getTime(),
            salary_from,
            salary_to,
            creator_uid,
          })
          .then(reply =>
            db
              .ref(`users/${creator_uid}/posts`)
              .push({
                post_key: reply.key,
                creation_time: now.getTime(),
                post_author,
                salary_from,
                job_location,
                payment_currency,
                salary_to,
                short_job_description: short_job_description.slice(0, SUMMARY_LIMIT),
              })
              .then(() =>
                this.setState(() => ({ ...INIT_STATE }), () => history.push(ROUTES.JOBS_TABLE))
              )
          );
      } else {
        // Handle error somehow?
      }
    };

    is_invalid = (cb = null) => {
      if (this.input_salary_from && this.input_salary_to) {
        const { value: salary_from } = this.input_salary_from;
        const { value: salary_to } = this.input_salary_to;
        const validated =
          is_number(salary_from) &&
          is_number(salary_to) &&
          +salary_from <= +salary_to &&
          Object.keys(this.state)
            .map(k => {
              const is_missing = this.state[k] !== '';
              if (is_missing && cb) cb(k);
              return is_missing;
            })
            .reduce((accumulator, currentValue) => accumulator && currentValue);
        return validated;
      } else {
        return false;
      }
    };

    render() {
      return (
        <section style={new_job_page}>
          <form onSubmit={this.submit_new_job_posting}>
            <fieldset disabled={this.context.authenticated_user === null} style={column}>
              <legend>Post a new tech job</legend>
              {/* Job Location */}
              <div style={field}>
                <label style={field_label}>Location</label>
                <input
                  type={'text'}
                  value={this.state.job_location}
                  onChange={event =>
                    this.setState(updateByPropertyName('job_location', event.target.value))
                  }
                  placeholder={'yerevan'}
                />
              </div>
              {/* Salary Range */}
              <div style={field}>
                <label style={field_label}>Salary range</label>
                <input
                  ref={e => (this.input_salary_from = e)}
                  type={'number'}
                  placeholder={'300000'}
                />
                <input
                  ref={e => (this.input_salary_to = e)}
                  type={'number'}
                  placeholder={'1000000'}
                />
              </div>
              {/* Payment Currency */}
              <div style={field}>
                <label style={field_label}>Currency Type</label>
                <input
                  type={'text'}
                  value={this.state.payment_currency}
                  onChange={event =>
                    this.setState(updateByPropertyName('payment_currency', event.target.value))
                  }
                />
              </div>
              {/* Post Author */}
              <div style={field}>
                <label style={field_label}>Poster Name</label>
                <input
                  type={'text'}
                  value={this.state.post_author}
                  onChange={event =>
                    this.setState(updateByPropertyName('post_author', event.target.value))
                  }
                  placeholder={'PicsArt'}
                />
              </div>
              {/* Contact Info */}
              <div style={field}>
                <label style={field_label}>Contact Information</label>
                <input
                  onChange={event =>
                    this.setState(updateByPropertyName('contact_info', event.target.value))
                  }
                  value={this.state.contact_info}
                  placeholder={'jobs@techcompany.am'}
                  type={'email'}
                />
              </div>
              {/* Short Job Description */}
              <div style={field}>
                <label style={field_label}>Short Job Description ({SUMMARY_LIMIT} chars)</label>
                <textarea
                  maxLength={120}
                  rows={4}
                  cols={30}
                  onChange={event =>
                    this.setState(updateByPropertyName('short_job_description', event.target.value))
                  }
                  value={this.state.short_job_description}
                  placeholder={'This will be the single line description on the jobs board'}
                />
              </div>
              {/* Full job Description */}
              <div style={field}>
                <label style={field_label}>
                  Full Job Description ({JOB_POSTING_DESCRIPTION_LIMIT} chars)
                </label>
                <textarea
                  maxLength={1000}
                  rows={6}
                  cols={40}
                  onChange={event =>
                    this.setState(updateByPropertyName('job_description', event.target.value))
                  }
                  value={this.state.job_description}
                  placeholder={'Shown in the drop down in the job posting'}
                />
              </div>
              <input
                className={'NewJobPosting__SubmitButton'}
                disabled={!this.is_invalid()}
                type={'submit'}
                value={'Submit'}
              />
            </fieldset>
          </form>
        </section>
      );
    }
  }
);
