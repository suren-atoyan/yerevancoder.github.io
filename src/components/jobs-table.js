import React from 'react';
import format from 'date-fns/format';

import { ROW, TEXT_S } from '../utils/constants';

const posting_s = {
  paddingTop: '2%',
  paddingBottom: '2%',
  boxShadow: '3px 3px 5px 6px #ccc',
  marginBottom: 35,
  borderRadius: 10,
};

const details_s = { paddingLeft: '2%', paddingRight: '2%' };

const summary_s = { ...TEXT_S, display: 'list-item', cursor: 'pointer' };

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
  <div style={posting_s}>
    <details style={details_s}>
      <summary style={summary_s}>{short_job_description}</summary>
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
    </details>
  </div>
);

export default ({ all_jobs }) => {
  const postings = all_jobs.map(s => (
    <Posting {...s} key={`${s.job_description}/${s.post_author}/${s.job_location}`} />
  ));
  return <section>{postings}</section>;
};
