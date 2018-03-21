import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth } from '../utils/db';
import { updateByPropertyName } from '../utils/funcs';
import { DISPLAY_FLEX_S, TEXT_S, NO_MARGIN_BOTTOM, FORM_BASE_STYLE } from '../utils/constants';
import {
  LOGIN_ENTRY_BOX_PROMPT_S,
  WIDTH_WITH_MARGIN,
  BAR,
  SPACE,
  LOGIN_ENTRY_BOX_FIELDSET_S,
} from './common-styles';

const INITIAL_STATE = { email: '', password: '', error: null, remember_me_checked: false };

const login_entry_box_forgot_password = {
  ...NO_MARGIN_BOTTOM,
  color: '#3c9ac9',
  fontWeight: 700,
};

const form_s = {
  ...FORM_BASE_STYLE,
};

const login_entry_box_signin_s = { ...WIDTH_WITH_MARGIN };

const remember_forget_row_s = {
  ...WIDTH_WITH_MARGIN,
  paddingTop: '10px',
  paddingBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
};

export default withRouter(
  class SignInForm extends React.Component {
    state = { ...INITIAL_STATE };

    static contextTypes = {
      authenticated_user: PropTypes.object,
      userDidAuthSuccessfully: PropTypes.func,
    };

    onSubmit = event => {
      const { email, password, remember_me_checked } = this.state;
      const { user_did_sign_in } = this.props;
      const { userDidAuthSuccessfully } = this.context;
      event.preventDefault();
      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ uid, refreshToken, metadata, email: email_account }) =>
          this.setState(
            () => ({ ...INITIAL_STATE }),
            userDidAuthSuccessfully(
              { uid, refreshToken, metadata, email_account },
              user_did_sign_in,
              remember_me_checked
            )
          )
        )
        .catch(error => this.setState(updateByPropertyName('error', error)));
    };

    make_remember_forget_row() {
      const remember_me_update = event =>
        this.setState(updateByPropertyName('remember_me_checked', event.target.value));
      return (
        <div style={remember_forget_row_s}>
          <div
            style={{
              paddingLeft: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <input
              type={'checkbox'}
              style={{ height: '20px' }}
              onChange={remember_me_update}
              value={this.state.remember_me_checked}
            />
            <label style={{ color: '#7d8487', paddingLeft: '10px', fontWeight: 700 }}>
              Remember me
            </label>
          </div>
          <p style={login_entry_box_forgot_password}>Forgot Password</p>
        </div>
      );
    }
    render() {
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';
      const top_message = (
        <p style={LOGIN_ENTRY_BOX_PROMPT_S}>{error ? error.message : this.props.login_message}</p>
      );
      const email_update = event =>
        this.setState(updateByPropertyName('email', event.target.value));
      const password_update = event =>
        this.setState(updateByPropertyName('password', event.target.value));

      return (
        <form
          onSubmit={this.onSubmit}
          style={form_s}
          className={'ReactModal__Content--after-open SigninForm__Container'}>
          <fieldset style={LOGIN_ENTRY_BOX_FIELDSET_S}>
            {top_message}
            {BAR}
            {SPACE}
            <input
              value={email}
              onChange={email_update}
              type={'text'}
              placeholder={'Email Address'}
            />
            <input
              value={password}
              onChange={password_update}
              type="password"
              placeholder="Password"
            />
            {this.make_remember_forget_row()}
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
