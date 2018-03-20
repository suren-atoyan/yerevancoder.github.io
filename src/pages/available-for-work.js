import React from 'react';

import SigninBar from '../Components/signin-bar';
import FreelancerTable from '../Components/freelancer-table';

const f = () => {
  console.log('Hello world');
};

export default props => {
  return (
    <div className={'AvailableForWorkContainer'}>
      <div>
        <h4 className={'AvailableForWorkContainer__PageBanner'}>
          Freelance programmers in Armenia
        </h4>
        <SigninBar
          signin_handler={f}
          signup_handler={f}
          signout_handler={f}
          signed_in_handler={f}
          is_signed_in={false}
          when_active_name={'edgar.factorial@gmail.com'}
        />
      </div>
      <FreelancerTable />
    </div>
  );
};
