import React from 'react';
import format from 'date-fns/format';

const PostingRecord = ({ record, delete_record }) => {
  const {
    post_key,
    creation_time,
    short_job_description,
    payment_currency,
    post_author,
    job_location,
    salary_from,
    salary_to,
  } = record;
  const post_day = format(new Date(creation_time), 'DD/MMM');
  return (
    <div className={'Profile__PostingRecord'}>
      <div>
        <span>{post_day}</span>
        <span>{payment_currency}</span>
      </div>
      <div>
        <textarea readOnly={true} defaultValue={short_job_description} />
        <div>
          <span>{job_location}</span>
          <span>
            {salary_from}
            {' ≤ '}Salary{' ≤ '}
            {salary_to}
          </span>
        </div>
      </div>
      <span
        data-balloon={'Delete this posting'}
        data-balloon-pos={'left'}
        className={'Profile__DeletePosting'}
        onClick={() => delete_record(post_key)}>
        {'❌'}
      </span>
    </div>
  );
};

export default ({ my_hiring_submissions, delete_record }) => (
  <section className={'HiringSubmissions'}>
    <h4>My job postings</h4>
    {my_hiring_submissions.map(s => (
      <PostingRecord key={s.post_key} record={s} delete_record={delete_record} />
    ))}
  </section>
);
