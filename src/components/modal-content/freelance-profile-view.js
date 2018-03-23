import React from 'react';

export default ({ self_freelance_posting, delete_posting_handler }) => {
  if (self_freelance_posting) {
    const { post_key, ...freelance_posting } = self_freelance_posting;
    return (
      <div className={'FreelanceProfileSubmission'}>
        <span className={'FreelanceProfileSubmission__PostingBanner'}>
          My Freelancer Submission
        </span>
        <pre className={'FreelanceProfileSubmission__MonoText'}>
          {JSON.stringify(freelance_posting, null, 4)}
        </pre>
        <input
          className={'NewFreelancerFormContainer__SubmitButton'}
          value={'Delete'}
          onClick={delete_posting_handler}
          type={'button'}
        />
      </div>
    );
  } else {
    return <span style={{ textAlign: 'center' }}>You haven't posted yet</span>;
  }
};
