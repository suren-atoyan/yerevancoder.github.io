import React from 'react';

import { updateByPropertyName, is_number } from '../utils/funcs';
import WithEffectInput from './with-effect-input';
import {
  JOB_POSTING_DESCRIPTION_LIMIT,
  SUMMARY_LIMIT,
  FANCY_INPUT_BOXES,
} from '../utils/constants';

const INIT_STATE = {
  job_location: '',
  payment_currency: 'dram',
  salary_from: '',
  salary_to: '',
  post_author: '',
  job_description: '',
  short_job_description: '',
  contact_info: '',
  error: null,
};

export default class NewJobPosting extends React.Component {
  state = { ...INIT_STATE };

  submit_new_job_posting = e => {
    e.preventDefault();
    const { submit_new_hiring_post } = this.props;
    let missing_field = null;
    if (this.is_invalid(k => (missing_field = k))) {
      const { error, ...useful_data } = this.state;
      useful_data.short_job_description = useful_data.short_job_description.slice(0, SUMMARY_LIMIT);
      useful_data.job_description = useful_data.job_description.slice(
        0,
        JOB_POSTING_DESCRIPTION_LIMIT
      );
      const now = new Date();
      submit_new_hiring_post({ ...useful_data, creation_time: now.getTime() });

      // .then(reply =>
      //   db
      //     .ref(`users/${creator_uid}/posts`)
      //     .push({
      //       post_key: reply.key,
      //       creation_time: now.getTime(),
      //       post_author,
      //       salary_from,
      //       job_location,
      //       payment_currency,
      //       salary_to,
      //       short_job_description: short_job_description.slice(0, SUMMARY_LIMIT),
      //     })
      //     .then(() => this.setState(() => ({ ...INIT_STATE }), undefined))
      // );
    } else {
      // Handle error somehow?
    }
  };

  is_invalid = (cb = null) => {
    const { salary_from, salary_to, error, ...rest } = this.state;
    const validated =
      is_number(salary_from) &&
      is_number(salary_to) &&
      +salary_from <= +salary_to &&
      Object.keys(rest)
        .map(k => {
          const is_missing = rest[k] !== '';
          if (is_missing && cb) cb(k);
          return is_missing;
        })
        .reduce((accumulator, currentValue) => accumulator && currentValue);
    return validated;
  };

  render() {
    const { error } = this.state;
    return (
      <div className={'NewFreelancerFormContainer'}>
        <form onSubmit={this.submit_new_job_posting}>
          <fieldset disabled={this.is_invalid()}>
            <legend
              className={
                error
                  ? 'NewFreelancerFormContainer__GuidingLegend--Error'
                  : 'NewFreelancerFormContainer__GuidingLegend--Success'
              }>
              {error ? error.message : 'Post a new tech job'}
            </legend>
            <div className={'FreelancerTable__FreelancerColumnDescription'}>
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_LOCATION}
                input_type={'text'}
                query_field={() => this.state.job_location}
                on_change={event =>
                  this.setState(updateByPropertyName('job_location', event.target.value))
                }
                label={'Location'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_SALARY_FROM}
                query_field={() => this.state.salary_from}
                input_type={'number'}
                on_change={event =>
                  this.setState(updateByPropertyName('salary_from', event.target.value))
                }
                label={'Salary from'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_SALARY_TO}
                input_type={'number'}
                query_field={() => this.state.salary_to}
                on_change={event =>
                  this.setState(updateByPropertyName('salary_to', event.target.value))
                }
                label={'Salary to'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_LOCATION}
                input_type={'text'}
                query_field={() => this.state.payment_currency}
                on_change={event =>
                  this.setState(updateByPropertyName('payment_currency', event.target.value))
                }
                label={'Currency Type'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_POSTER_NAME}
                input_type={'text'}
                query_field={() => this.state.post_author}
                on_change={event =>
                  this.setState(updateByPropertyName('post_author', event.target.value))
                }
                label={'Poster Name'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_CONTACT_INFO}
                on_change={event =>
                  this.setState(updateByPropertyName('contact_info', event.target.value))
                }
                query_field={() => this.state.contact_info}
                label={'Contact Information'}
                input_type={'email'}
              />
              <div>
                <label>Short Job Description ({SUMMARY_LIMIT} chars)</label>
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
              <div>
                <label>Full Job Description ({JOB_POSTING_DESCRIPTION_LIMIT} chars)</label>
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
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
