import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth } from '../utils/db';
import { updateByPropertyName } from '../utils/funcs';
import { ROUTES } from '../utils/constants';

const INITIAL_STATE = { email: '', password: '', error: null };

const error_message_s = {};

export default withRouter(
  class SignInForm extends React.Component {
    state = { ...INITIAL_STATE };

    static contextTypes = {
      authenticated_user: PropTypes.object,
      userDidAuthSuccessfully: PropTypes.func,
    };

    onSubmit = async event => {
      const { email, password } = this.state;
      const { history } = this.props;
      event.preventDefault();
      try {
        const {
          uid,
          refreshToken,
          metadata,
          email: email_account,
        } = await auth.signInWithEmailAndPassword(email, password);
        const { userDidAuthSuccessfully } = this.context;
        userDidAuthSuccessfully({ uid, refreshToken, metadata, email_account }, () =>
          this.setState(
            () => ({ ...INITIAL_STATE }),
            () => {
              history.push(ROUTES.NEW_JOB_POSTING);
            }
          )
        );
      } catch (error) {
        this.setState(updateByPropertyName('error', error));
      }
    };

    render() {
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';
      return (
        <form onSubmit={this.onSubmit}>
          <input
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type={'text'}
            placeholder={'Email Address'}
          />
          <input
            value={password}
            onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
          {error && <p style={error_message_s}>{error.message}</p>}
        </form>
      );
    }
  }
);
