import React from 'react';

export default ({
  signin_handler,
  signup_handler,
  signout_handler,
  signed_in_handler,
  is_signed_in,
  when_active_name,
  custom_input_handler_signedin,
  custom_input_handler_signedout,
  custom_input_signed_in_name,
  custom_input_signed_out_name,
}) => {
  const custom_input =
    !custom_input_handler_signedin ||
    !custom_input_handler_signedout ||
    !custom_input_signed_in_name ||
    !custom_input_signed_out_name ? null : (
      <input
        type={'button'}
        value={is_signed_in ? custom_input_signed_in_name : custom_input_signed_out_name}
        onClick={is_signed_in ? custom_input_handler_signedin : custom_input_handler_signedout}
        className={
          is_signed_in
            ? 'loginActionRow__CustomInputField--UserSignedIn'
            : 'loginActionRow__CustomInputField--UserSignedOut'
        }
        disabled={!is_signed_in}
      />
    );
  const signin_or_signout = (
    <input
      className={
        is_signed_in
          ? 'loginActionRow__SigninOrSignOut--UserSignedIn'
          : 'loginActionRow__SigninOrSignOut--UserSignedOut'
      }
      onClick={is_signed_in ? signout_handler : signin_handler}
      type={'button'}
      value={is_signed_in ? 'Sign out' : 'Sign in'}
    />
  );
  const signup_or_logged_in = (
    <input
      className={
        is_signed_in
          ? 'loginActionRow__SignUpOrLoggedIn--UserSignedIn'
          : 'loginActionRow__SignUpOrLoggedIn--UserSignedOut'
      }
      onClick={is_signed_in ? signed_in_handler : signup_handler}
      type={'button'}
      value={is_signed_in ? when_active_name : 'Sign up'}
    />
  );
  return (
    <div className={'loginActionRow__RowContainer'}>
      {custom_input}
      {signin_or_signout}
      {signup_or_logged_in}
    </div>
  );
};
