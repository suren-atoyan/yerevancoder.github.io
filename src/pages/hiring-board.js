import React from 'react';
import Link from 'gatsby-link';
import addDays from 'date-fns/add_days';

import { rhythm } from '../utils/typography';
import JobsTable from '../components/jobs-table';

const s = { marginTop: rhythm(1.5) };
const d = new Date();

const dummy_data = [
  {
    post_date: addDays(d, 1),
    job_location: 'Yerevan',
    salary_range: { from: '300', to: '300' },
    payment_currency: 'dollars',
    post_author: 'Hasmik',
    job_description: 'blah blah',
    short_job_description: 'work with go',
    contact_info: 'iteratehackerspace@gmail.com',
  },
  {
    post_date: addDays(d, 2),
    job_location: 'Yerevan',
    salary_range: { from: '300', to: '300' },
    payment_currency: 'dollars',
    post_author: 'Hasmik',
    job_description: 'blah blah 2',
    short_job_description: 'work with blockchain',
    contact_info: 'iteratehackerspace@gmail.com',
  },
  {
    post_date: addDays(d, 3),
    job_location: 'Yerevan',
    payment_currency: 'lira',
    salary_range: { from: '300', to: '300' },
    post_author: 'Hasmik',
    job_description: 'blah blah 3',
    short_job_description: 'work with python',
    contact_info: 'iteratehackerspace@gmail.com',
  },
  {
    post_date: addDays(d, 4),
    job_location: 'Yerevan',
    payment_currency: 'drams',
    salary_range: { from: '300', to: '300' },
    post_author: 'Hasmik',
    job_description: 'blah blah 4',
    short_job_description: 'work with C++',
    contact_info: 'iteratehackerspace@gmail.com',
  },
];

export default class HiringBoard extends React.Component {
  state = { jobs: dummy_data };

  fetchJobs = async () => {
    //
  };

  render() {
    return (
      <div style={s}>
        <JobsTable all_jobs={this.state.jobs} />
      </div>
    );
  }
}
