import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTES, FANCY_INPUT_BOXES } from '../../utils/constants';
import { updateByPropertyName } from '../../utils/funcs';
import WithEffectInput from '../with-effect-input';

const INITIAL_STATE = { username: '', email: '', password_one: '', password_two: '', error: null };

const signup_message = 'Sign up for an account';

export default withRouter(
  class SignUpForm extends Component {
    state = { ...INITIAL_STATE };

    static contextTypes = {};

    onSubmit = event => {
      event.preventDefault();
      const { username, email, password_one } = this.state;
      // const { history, user_did_sign_in } = this.props;
      // const { userDidAuthSuccessfully } = this.context;
      // auth
      //   .createUserWithEmailAndPassword(email, passwordOne)
      //   .then(({ uid, refreshToken, metadata }) =>
      //     db
      //       .ref(`users/${uid}`)
      //       .set({ username, email })
      //       .then(() => {
      //         userDidAuthSuccessfully({
      //           uid,
      //           refreshToken,
      //           metadata,
      //           email_account: email,
      //         });
      //         this.setState(() => ({ ...INITIAL_STATE }), () => history.push(ROUTES.JOBS_TABLE));
      //       })
      //       .then(user_did_sign_in)
      //       .catch(error => this.setState(updateByPropertyName('error', error)))
      //   )
      //   .catch(error => this.setState(updateByPropertyName('error', error)));
    };

    render() {
      const { username, email, password_one, password_two, error } = this.state;
      const isInvalid =
        password_one !== password_two || password_one === '' || username === '' || email === '';
      const top_message = <p>{error ? error.message : signup_message}</p>;

      return (
        <form onSubmit={this.onSubmit}>
          <fieldset>
            {top_message}
            <WithEffectInput
              box_name={FANCY_INPUT_BOXES.SIGNUP_USERNAME}
              query_field={() => this.state.username}
              on_change={event =>
                this.setState(updateByPropertyName('username', event.target.value))
              }
              input_type={'text'}
              label={'Full Name'}
            />
            <WithEffectInput
              box_name={FANCY_INPUT_BOXES.SIGNUP_EMAIL}
              query_field={() => this.state.email}
              on_change={event => this.setState(updateByPropertyName('email', event.target.value))}
              input_type={'email'}
              label={'Email Address'}
            />
            <WithEffectInput
              box_name={FANCY_INPUT_BOXES.SIGNUP_PASSWORD_ONE}
              query_field={() => password_one}
              on_change={event =>
                this.setState(updateByPropertyName('password_one', event.target.value))
              }
              input_type={'password'}
              label={'Password'}
            />
            <WithEffectInput
              box_name={FANCY_INPUT_BOXES.SIGNUP_PASSWORD_TWO}
              query_field={() => password_two}
              on_change={event =>
                this.setState(updateByPropertyName('password_two', event.target.value))
              }
              input_type={'password'}
              label={'Confirm Password'}
            />
            <input type={'button'} disabled={isInvalid} type={'submit'} value={'Create Account'} />
          </fieldset>
        </form>
      );
    }
  }
);
