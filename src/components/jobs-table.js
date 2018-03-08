import React from 'react';
import format from 'date-fns/format';

const posting_s = {
  paddingTop: '2%',
  paddingBottom: '2%',
  boxShadow: '3px 3px 5px 6px #ccc',
  marginBottom: '35',
  borderRadius: '10',
};

const details_s = { paddingLeft: '2%', paddingRight: '2%' };

const summary_s = { display: 'list-item' };

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
      <span>Contact: {contact_info}</span>
    </details>
  </div>
);

export default class JobsTable extends React.Component {
  render() {
    const { all_jobs } = this.props;
    const postings = all_jobs.map(s => (
      <Posting {...s} key={`${s.job_description}/${s.post_author}`} />
    ));
    return (
      <section>
        <h2>Get hired now</h2>
        {postings}
      </section>
    );
  }
}
