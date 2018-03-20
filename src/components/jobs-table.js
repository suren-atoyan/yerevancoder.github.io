import React from 'react';
import format from 'date-fns/format';

import { ROW, TEXT_S } from '../utils/constants';

const summary_s = { ...TEXT_S };

const label_s = { color: 'rgb(127, 127, 127)' };

const job_description_s = {
  borderWidth: 1,
  borderColor: 'black',
  borderStyle: 'inset',
  padding: '2%',
  backgroundColor: '#f5f5ea',
};

const Posting = ({
  creation_time,
  job_location,
  salary_from: from,
  salary_to: to,
  payment_currency,
  post_author,
  job_description,
  short_job_description,
  contact_info,
}) => (
  <section className={'JobPostingCard'}>
    <h4 style={summary_s}>{short_job_description}</h4>
    <div style={ROW}>
      <span style={label_s}>Posted by: {post_author}</span>
      <span style={label_s}>Post date: {format(new Date(creation_time), 'DD/MMM/YYYY')}</span>
    </div>
    <div style={ROW}>
      <span style={label_s}>Location: {job_location}</span>
      <span style={label_s}>
        Salary Range => from: {from} to: {to} {payment_currency}
      </span>
    </div>
    <p style={job_description_s}>{job_description}</p>
    <span style={TEXT_S}>Contact: {contact_info}</span>
  </section>
);

export default ({ all_jobs }) => {
  const postings = all_jobs.map(s => (
    <Posting {...s} key={`${s.job_description}/${s.post_author}/${s.job_location}`} />
  ));
  return <section>{postings}</section>;
};
