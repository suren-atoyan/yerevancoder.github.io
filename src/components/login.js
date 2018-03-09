import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth } from '../utils/db';
import { updateByPropertyName } from '../utils/funcs';
import { DISPLAY_FLEX_S, TEXT_S } from '../utils/constants';

const INITIAL_STATE = { email: '', password: '', error: null };

const error_message_s = {};

const login_s = { ...DISPLAY_FLEX_S, flexDirection: 'column' };
const login_message = <p style={{ ...TEXT_S, textAlign: 'center' }}>Login to post jobs</p>;

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
          {login_message}
          <fieldset style={login_s}>
            <input
              value={email}
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              type={'text'}
              placeholder={'Email Address'}
            />
            <input
              value={password}
              onChange={event =>
                this.setState(updateByPropertyName('password', event.target.value))
              }
              type="password"
              placeholder="Password"
            />
            <input value={'Sign In'} disabled={isInvalid} type="submit" />
            {error && <p style={error_message_s}>{error.message}</p>}
          </fieldset>
        </form>
      );
    }
  }
);
