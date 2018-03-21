import React from 'react';
import Modal from 'react-modal';

import Signin from '../components/signin';
import Signup from '../components/signup';
import Profile from '../components/profile';
import SigninBar from '../components/signin-bar';
import FreelancerTable from '../components/freelancer-table';
import { MODAL_TRANSITION } from '../utils/constants';

const f = () => {
  console.log('Hello world');
};

const modal_s = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    transform: 'translate(-50%, -50%)',
  },
};

const MODAL_CONTENT = {
  PROFILE_VIEW: 'profile-view',
  SIGNIN_VIEW: 'signin-view',
  SIGNUP_VIEW: 'signup-view',
};

const dummy_data = [
  {
    name: 'Abe',
    github_link: 'https://github.com/fxfactorial',
    linkedin_link: 'https://linkedin.com/foo-bar',
    resume_link: 'https://something.com',
    self_description: 'I am a coder',
    known_technologies: ['javascript', 'sql', 'c++'],
  },
  {
    name: 'Abe10',
    github_link: null,
    linkedin_link: 'linkedin.com/foobar',
    resume_link: 'https://goodbar',
    self_description: 'I am a coder',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe8',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: 'Something good about me',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe15',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: 'I am some coder in SF',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe102',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: '',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe2',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: '',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe310',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: '',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe38',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: '',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe315',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: '',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe316',
    github_link: '',
    linkedin_link: 'https://linkedin.com/',
    resume_link: '',
    self_description: '',
    self_description: 'I am a coder',
    known_technologies: ['javascript', 'sql'],
  },
  {
    name: 'Abe32',
    github_link: '',
    linkedin_link: '',
    resume_link: '',
    self_description: '',
    self_description: 'I am a coder',

    known_technologies: ['javascript', 'sql'],
  },
];

export default class AvailableForWorkPage extends React.Component {
  state = {
    modal_show: false,
    modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    user_email_account: null,
    freelancers: dummy_data,
  };

  toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

  user_did_sign_in = user_email_account => {
    this.setState(() => ({ user_email_account, modal_show: false }));
  };

  modal_content = () => {
    switch (this.state.modal_content) {
      case MODAL_CONTENT.PROFILE_VIEW:
        return <Profile jobs={this.state.jobs} force_query={this.query_data} />;
      case MODAL_CONTENT.SIGNIN_VIEW:
        return <Signin login_message={'Sign in'} user_did_sign_in={this.user_did_sign_in} />;
      case MODAL_CONTENT.SIGNUP_VIEW:
        return <Signup user_did_sign_in={this.user_did_sign_in} />;
      default:
        return null;
    }
  };

  signin_handler = () =>
    this.setState(() => ({ modal_show: true, modal_content: MODAL_CONTENT.SIGNIN_VIEW }));

  signup_handler = () =>
    this.setState(() => ({ modal_show: true, modal_content: MODAL_CONTENT.SIGNUP_VIEW }));

  render() {
    return (
      <div className={'AvailableForWorkContainer'}>
        <Modal
          closeTimeoutMS={MODAL_TRANSITION}
          isOpen={this.state.modal_show}
          onRequestClose={this.toggle_modal}
          ariaHideApp={false}
          style={modal_s}
          contentLabel="Signin to Yerevancoder">
          {this.modal_content()}
        </Modal>
        <div>
          <h4 className={'AvailableForWorkContainer__PageBanner'}>
            Freelance programmers in Armenia
          </h4>
          <SigninBar
            signin_handler={this.signin_handler}
            signup_handler={this.signup_handler}
            signout_handler={f}
            signed_in_handler={f}
            is_signed_in={false}
            when_active_name={'edgar.factorial@gmail.com'}
          />
        </div>
        <FreelancerTable freelancers={this.state.freelancers} />
      </div>
    );
  }
}
