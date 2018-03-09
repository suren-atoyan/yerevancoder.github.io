import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { rhythm } from '../utils/typography';
import { updateByPropertyName } from '../utils/funcs';

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

export default withRouter(
  class NewJobPosting extends React.Component {
    static contextTypes = {
      authenticated_user: PropTypes.object,
    };

    state = {
      post_date: null,
      job_location: null,
      salary_range_from: null,
      salary_range_to: null,
      payment_currency: 'dram',
      post_author: null,
      job_description: null,
      short_job_description: null,
      contact_info: null,
    };

    submit_new_job_posting = async () => {
      console.log({ d: this.state });
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
                    value={this.state.salary_range_from}
                    onChange={event =>
                      this.setState(updateByPropertyName('salary_range_from', event.target.value))
                    }
                    type={'number'}
                    placeholder={'300000'}
                    style={input_s}
                  />
                  <input
                    value={this.state.salary_range_to}
                    onChange={event =>
                      this.setState(updateByPropertyName('salary_range_to', event.target.value))
                    }
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
                  maxlength={120}
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
                  maxlength={1000}
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
