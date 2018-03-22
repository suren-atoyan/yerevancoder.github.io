import React from 'react';
import Spinner from 'react-spinkit';
import { withRouter } from 'react-router-dom';

import { auth } from '../../utils/db';
import { updateByPropertyName } from '../../utils/funcs';
import { FANCY_INPUT_BOXES, LOADING_STATE } from '../../utils/constants';

import WithEffectInput from '../with-effect-input';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading_state: LOADING_STATE.NOT_STARTED_YET,
  remember_me_checked: false,
};

export default withRouter(
  class SignInForm extends React.Component {
    state = { ...INITIAL_STATE };

    onSubmit = event => {
      const { email, password, remember_me_checked } = this.state;
      const { user_did_sign_in, sign_user_in } = this.props;
      event.preventDefault();

      this.setState(
        () => ({ loading_state: LOADING_STATE.CURRENTLY_LOADING }),
        () =>
          sign_user_in(email, password, remember_me_checked)
            .then(() => this.setState(() => ({ ...INITIAL_STATE }), user_did_sign_in))
            .catch(error => this.setState(updateByPropertyName('error', error)))
      );
    };

    make_remember_forget_row() {
      const remember_me_update = event =>
        this.setState(updateByPropertyName('remember_me_checked', event.target.value));
      return (
        <div>
          <div className={'PlainFlexColumn OnePaddingLeft PlainFlexCentered'}>
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
          <p>Forgot Password</p>
        </div>
      );
    }
    render() {
      const { email, password, error } = this.state;
      const is_invalid = password === '' || email === '';
      const top_message = <p>{error ? error.message : this.props.login_message}</p>;

      const extra_css_classname =
        this.state.loading_state === LOADING_STATE.CURRENTLY_LOADING
          ? 'ProfileContainer__SpinningCentered'
          : '';

      const content =
        this.state.loading_state === LOADING_STATE.CURRENTLY_LOADING ? (
          <div className={'Profile__Container__LoadingSpinner'}>
            <Spinner fadeIn={'quarter'} name={'ball-pulse-rise'} />
          </div>
        ) : (
          <fieldset>
            {top_message}
            <WithEffectInput
              box_name={FANCY_INPUT_BOXES.SIGNIN_EMAIL}
              query_field={() => this.state.email}
              on_change={event => this.setState(updateByPropertyName('email', event.target.value))}
              label={'Email'}
              input_type={'email'}
            />
            <WithEffectInput
              box_name={FANCY_INPUT_BOXES.SIGNIN_PASSWORD}
              query_field={() => this.state.password}
              on_change={event =>
                this.setState(updateByPropertyName('password', event.target.value))
              }
              label={'Password'}
              input_type={'password'}
            />
            {this.make_remember_forget_row()}
            <input value={'Sign In'} disabled={is_invalid} type={'submit'} />
          </fieldset>
        );
      return (
        <form
          onSubmit={this.onSubmit}
          className={`ReactModal__Content--after-open Profile__Container ${extra_css_classname}`}>
          {content}
        </form>
      );
    }
  }
);
