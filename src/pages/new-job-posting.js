import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { rhythm } from '../utils/typography';
import { updateByPropertyName } from '../utils/funcs';
import { db } from '../utils/db';
import { ROUTES } from '../utils/constants';

const s = { marginTop: rhythm(1.5), backgroundColor: '#f5f5ea', paddingBottom: rhythm(1.5) };

const text_s = { fontFamily: 'Montserrat, sans-serif' };

const field_label = { ...text_s, fontSize: 20 };

const new_posting_s = { ...text_s, fontSize: 24 };

const field = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
};

const row = { display: 'flex' };

const column = { display: 'flex', flexDirection: 'column', marginLeft: '10%', marginRight: '10%' };

const input_s = { paddingLeft: '5px' };

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
    static contextTypes = {
      authenticated_user: PropTypes.object,
    };

    state = { ...INIT_STATE };

    submit_new_job_posting = e => {
      e.preventDefault();
      const { value: salary_from } = this.input_salary_from;
      const { value: salary_to } = this.input_salary_from;
      const { history } = this.props;
      let missing_field = null;
      if (
        salary_from !== '' ||
        salary_to !== '' ||
        Object.keys(this.state)
          .map(k => {
            const is_missing = this.state[k] !== '';
            if (is_missing) missing_field = k;
            return is_missing;
          })
          .reduce((accumulator, currentValue) => accumulator && currentValue)
      ) {
        const { uid: creator_uid } = this.context.authenticated_user;
        const now = new Date();
        const uuid = format(now, 'DD/MMM/YYYY/ss').replace(/\//g, '-');
        db
          .ref(`posts`)
          .push({
            ...this.state,
            creation_time: now.getTime(),
            salary_from,
            salary_to,
            creator_uid,
          })
          .then(reply =>
            db
              .ref(`users/${creator_uid}/posts`)
              .push({ post_key: reply.key })
              .then(() =>
                this.setState(() => ({ ...INIT_STATE }), () => history.push(ROUTES.JOBS_TABLE))
              )
          );
      } else {
        // Handle error somehow?
      }
    };

    render() {
      return (
        <section style={s}>
          <p style={new_posting_s}>Post a new job</p>
          <form onSubmit={this.submit_new_job_posting}>
            <fieldset disabled={this.context.authenticated_user === null} style={column}>
              {/* Job Location */}
              <div style={field}>
                <label style={field_label}>Location</label>
                <input
                  value={this.state.job_location}
                  onChange={event =>
                    this.setState(updateByPropertyName('job_location', event.target.value))
                  }
                  placeholder={'yerevan'}
                  style={input_s}
                />
              </div>
              {/* Salary Range */}
              <div style={field}>
                <label style={field_label}>Salary range</label>
                <div style={row}>
                  <input
                    ref={e => (this.input_salary_from = e)}
                    type={'number'}
                    placeholder={'300000'}
                    style={input_s}
                  />
                  <input
                    ref={e => (this.input_salary_to = e)}
                    type={'number'}
                    placeholder={'1000000'}
                    style={input_s}
                  />
                </div>
              </div>
              {/* Payment Currency */}
              <div style={field}>
                <label style={field_label}>Currency Type</label>
                <input
                  value={this.state.payment_currency}
                  onChange={event =>
                    this.setState(updateByPropertyName('payment_currency', event.target.value))
                  }
                  style={input_s}
                />
              </div>
              {/* Post Author */}
              <div style={field}>
                <label style={field_label}>Poster Name</label>
                <input
                  value={this.state.post_author}
                  onChange={event =>
                    this.setState(updateByPropertyName('post_author', event.target.value))
                  }
                  placeholder={'PicsArt'}
                  style={input_s}
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
                  style={input_s}
                />
              </div>
              {/* Short Job Description */}
              <div style={field}>
                <label style={field_label}>Short Job Description (120 chars)</label>
                <textarea
                  maxLength={120}
                  rows={4}
                  cols={30}
                  onChange={event =>
                    this.setState(updateByPropertyName('short_job_description', event.target.value))
                  }
                  value={this.state.short_job_description}
                  placeholder={'This will be the single line description on the jobs board'}
                  style={input_s}
                />
              </div>
              {/* Full job Description */}
              <div style={field}>
                <label style={field_label}>Full Job Description (1000 chars)</label>
                <textarea
                  maxLength={1000}
                  rows={6}
                  cols={40}
                  onChange={event =>
                    this.setState(updateByPropertyName('job_description', event.target.value))
                  }
                  value={this.state.job_description}
                  placeholder={'Shown in the drop down in the job posting'}
                  style={input_s}
                />
              </div>
              <input type={'submit'} value={'Submit'} />
            </fieldset>
          </form>
        </section>
      );
    }
  }
);
