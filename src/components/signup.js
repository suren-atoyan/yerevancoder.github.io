import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth, db } from '../utils/db';
import { ROUTES, FORM_BASE_STYLE } from '../utils/constants';
import { updateByPropertyName } from '../utils/funcs';
import {
  LOGIN_ENTRY_BOX_PROMPT_S,
  WIDTH_WITH_MARGIN,
  BAR,
  SPACE,
  LOGIN_ENTRY_BOX_FIELDSET_S,
} from './common-styles';

const INITIAL_STATE = { username: '', email: '', passwordOne: '', passwordTwo: '', error: null };

const signup_message = 'Sign up for an account';

const signup_fieldset = {
  ...LOGIN_ENTRY_BOX_FIELDSET_S,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default withRouter(
  class SignUpForm extends Component {
    state = { ...INITIAL_STATE };

    static contextTypes = {
      userDidAuthSuccessfully: PropTypes.func,
    };

    onSubmit = event => {
      event.preventDefault();
      const { username, email, passwordOne } = this.state;
      const { history } = this.props;
      const { user_did_sign_in } = this.props;
      const { userDidAuthSuccessfully } = this.context;
      auth
        .createUserWithEmailAndPassword(email, passwordOne)
        .then(({ uid, refreshToken, metadata }) =>
          db
            .ref(`users/${uid}`)
            .set({ username, email })
            .then(() => {
              userDidAuthSuccessfully({
                uid,
                refreshToken,
                metadata,
                email_account: email,
              });
              this.setState(() => ({ ...INITIAL_STATE }), () => history.push(ROUTES.JOBS_TABLE));
            })
            .then(user_did_sign_in)
            .catch(error => this.setState(updateByPropertyName('error', error)))
        )
        .catch(error => this.setState(updateByPropertyName('error', error)));
    };

    render() {
      const { username, email, passwordOne, passwordTwo, error } = this.state;
      const isInvalid =
        passwordOne !== passwordTwo || passwordOne === '' || username === '' || email === '';
      const top_message = (
        <p style={LOGIN_ENTRY_BOX_PROMPT_S}>{error ? error.message : signup_message}</p>
      );

      return (
        <form onSubmit={this.onSubmit} style={FORM_BASE_STYLE}>
          <fieldset style={signup_fieldset}>
            {SPACE}
            {top_message}
            {BAR}
            {SPACE}
            <input
              value={username}
              onChange={event =>
                this.setState(updateByPropertyName('username', event.target.value))
              }
              type={'text'}
              placeholder={'Full Name'}
            />
            <input
              value={email}
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              type={'text'}
              placeholder={'Email Address'}
            />
            <input
              value={passwordOne}
              onChange={event =>
                this.setState(updateByPropertyName('passwordOne', event.target.value))
              }
              type={'password'}
              placeholder={'Password'}
            />
            <input
              value={passwordTwo}
              onChange={event =>
                this.setState(updateByPropertyName('passwordTwo', event.target.value))
              }
              type={'password'}
              placeholder={'Confirm Password'}
            />
            <input type={'button'} disabled={isInvalid} type={'submit'} value={'Create Account'} />
          </fieldset>
        </form>
      );
    }
  }
);
