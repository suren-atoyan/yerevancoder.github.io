import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import Signin from '../components/signin';
import Signup from '../components/signup';
import Profile from '../components/profile';
import SigninBar from '../components/signin-bar';
import FreelancerTable from '../components/freelancer-table';
import { MODAL_TRANSITION } from '../utils/constants';
import { freelancers_posts_ref } from '../utils/db';

const f = () => {
  console.log('Hello world');
};

const ADD_YOURSELF = 'Add yourself';

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
    self_description: `I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder, I am a coder
I am a coder, I am a coder, I am a coder, I am a coder
`,
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
];

export default class AvailableForWorkPage extends React.Component {
  state = {
    modal_show: false,
    modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    freelancers: dummy_data,
  };

  static contextTypes = { authenticated_user: PropTypes.object, sign_user_in: PropTypes.func };

  query_data = () => {
    freelancers_posts_ref.once('value').then(snap_shot => {
      const rows = snap_shot.val();
      if (rows) {
        this.setState(() => ({ freelancers: Object.values(rows) }));
      }
    });
  };

  componentDidMount() {
    this.query_data();
  }

  toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

  user_did_sign_in = () => {
    console.log('User did sign in!');
    this.setState(() => ({ modal_show: false }));
  };

  modal_content = () => {
    switch (this.state.modal_content) {
      case MODAL_CONTENT.SIGNIN_VIEW:
        return (
          <Signin
            login_message={'Sign in'}
            sign_user_in={this.context.sign_user_in}
            user_did_sign_in={this.user_did_sign_in}
          />
        );
      case MODAL_CONTENT.PROFILE_VIEW:
        return <Profile jobs={this.state.jobs} force_query={this.query_data} />;
      case MODAL_CONTENT.SIGNUP_VIEW:
        return <Signup user_did_sign_in={this.user_did_sign_in} />;
      default:
        return null;
    }
  };

  signin_handler = () =>
    this.setState(() => ({
      modal_show: true,
      modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    }));

  signup_handler = () =>
    this.setState(() => ({
      modal_show: true,
      modal_content: MODAL_CONTENT.SIGNUP_VIEW,
    }));

  render() {
    const { authenticated_user } = this.context;
    console.log({ authenticated_user });
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
        <nav className={'AvailableForWorkContainer__NavTopRow'}>
          <h4 className={'AvailableForWorkContainer__PageBanner'}>
            Freelance programmers in Armenia
          </h4>
          <SigninBar
            signin_handler={this.signin_handler}
            signup_handler={this.signup_handler}
            signout_handler={f}
            signed_in_handler={f}
            is_signed_in={authenticated_user !== null}
            when_active_name={authenticated_user ? authenticated_user.email : ''}
            custom_input_handler_signedin={f}
            custom_input_handler_signedout={f}
            custom_input_signed_in_name={ADD_YOURSELF}
            custom_input_signed_out_name={ADD_YOURSELF}
          />
        </nav>
        <FreelancerTable freelancers={this.state.freelancers} />
      </div>
    );
  }
}
