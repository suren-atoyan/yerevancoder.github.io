import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth } from '../utils/db';
import { updateByPropertyName } from '../utils/funcs';
import { DISPLAY_FLEX_S, TEXT_S, SPACER_30_H } from '../utils/constants';

const INITIAL_STATE = { email: '', password: '', error: null };

const login_entry_box_prompt_s = { ...TEXT_S, textAlign: 'center' };

const width_with_margin = { width: '90%', marginLeft: '5%', marginRight: '5%' };

const login_entry_box_fieldset_s = {
  ...DISPLAY_FLEX_S,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '10px',
  paddingTop: '10px',
};

const login_entry_box_signin_s = { ...width_with_margin };

const login_message = <p style={login_entry_box_prompt_s}>Login to post jobs</p>;

export default withRouter(
  class SignInForm extends React.Component {
    state = { ...INITIAL_STATE };

    static contextTypes = {
      authenticated_user: PropTypes.object,
      userDidAuthSuccessfully: PropTypes.func,
    };

    onSubmit = event => {
      const { email, password } = this.state;
      const { user_did_sign_in } = this.props;
      event.preventDefault();
      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ uid, refreshToken, metadata, email: email_account }) => {
          const { userDidAuthSuccessfully } = this.context;
          userDidAuthSuccessfully({ uid, refreshToken, metadata, email_account }, () =>
            this.setState(() => ({ ...INITIAL_STATE }), user_did_sign_in)
          );
        })
        .catch(error => this.setState(updateByPropertyName('error', error)));
    };

    render() {
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';
      return (
        <form onSubmit={this.onSubmit}>
          <fieldset style={login_entry_box_fieldset_s}>
            {error ? <p style={login_entry_box_prompt_s}>{error.message}</p> : login_message}
            <input
              value={email}
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              type={'text'}
              style={width_with_margin}
              placeholder={'Email Address'}
            />
            <input
              value={password}
              style={width_with_margin}
              onChange={event =>
                this.setState(updateByPropertyName('password', event.target.value))
              }
              type="password"
              placeholder="Password"
            />
            {SPACER_30_H}
            <input
              style={login_entry_box_signin_s}
              value={'Sign In'}
              disabled={isInvalid}
              type="submit"
            />
          </fieldset>
        </form>
      );
    }
  }
);
