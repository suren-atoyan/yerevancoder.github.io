import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth } from '../utils/db';
import { updateByPropertyName } from '../utils/funcs';
import { DISPLAY_FLEX_S, TEXT_S, NO_MARGIN_BOTTOM, ARMENIA_COLORS } from '../utils/constants';

const INITIAL_STATE = { email: '', password: '', error: null, remember_me_checked: false };

const login_entry_box_prompt_s = {
  ...TEXT_S,
  ...NO_MARGIN_BOTTOM,
  textAlign: 'center',
  lineHeight: 'calc(20px - 20%)',
  paddingBottom: '20px',
  fontWeight: 700,
};

const width_with_margin = { width: '90%', marginLeft: '5%', marginRight: '5%' };

const login_entry_box_forgot_password = {
  ...NO_MARGIN_BOTTOM,
  color: '#3c9ac9',
  fontWeight: 700,
};

const login_entry_box_input_field = {
  ...width_with_margin,
  border: 0,
  marginBottom: 10,
  borderRadius: 5,
  padding: '10px',
  fontWeight: 400,
  boxShadow: 'inset 0 2px 4px 0 hsla(0, 0%, 1%, 0.20)',
};

const form_s = {
  NO_MARGIN_BOTTOM,
  borderTop: '10px solid',
  borderImage: `linear-gradient(to right,
${ARMENIA_COLORS.red} 33%,
${ARMENIA_COLORS.blue} 33%,
${ARMENIA_COLORS.blue} 66%,
${ARMENIA_COLORS.orange} 66%) 5`,
};

const login_entry_box_fieldset_s = {
  paddingBottom: '10px',
  paddingTop: '20px',
  borderColor: 'transparent',
};

const login_entry_horizontal_bar = {
  ...width_with_margin,
  ...NO_MARGIN_BOTTOM,
  backgroundColor: 'grey',
};

const bar = <hr style={login_entry_horizontal_bar} />;

const login_entry_box_signin_s = { ...width_with_margin };

const login_message = 'Sign in to post jobs';

const space = <div style={{ height: '10px' }} />;

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
        <div
          style={{
            ...width_with_margin,
            paddingTop: '10px',
            paddingBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
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
        <p style={login_entry_box_prompt_s}>{error ? error.message : login_message}</p>
      );
      const email_update = event =>
        this.setState(updateByPropertyName('email', event.target.value));
      const password_update = event =>
        this.setState(updateByPropertyName('password', event.target.value));

      return (
        <form onSubmit={this.onSubmit} style={form_s}>
          <fieldset style={login_entry_box_fieldset_s}>
            {top_message}
            {bar}
            {space}
            <input
              value={email}
              onChange={email_update}
              type={'text'}
              style={login_entry_box_input_field}
              placeholder={'Email Address'}
            />
            <input
              value={password}
              style={login_entry_box_input_field}
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
