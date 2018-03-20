import React from 'react';

export default ({
  signin_handler,
  signup_handler,
  signout_handler,
  signed_in_handler,
  is_signed_in,
  when_active_name,
}) => {
  const signin_or_signout = (
    <input
      className={
        is_signed_in
          ? 'loginActionRow__SigninOrSignOut--UserSignedIn'
          : 'loginActionRow__SigninOrSignOut--UserSignedOut'
      }
      onClick={is_signed_in ? signout_handler : signin_handler}
      type={'button'}
      value={is_signed_in ? 'Signout' : 'Signin'}
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
      value={is_signed_in ? when_active_name : 'Signup'}
    />
  );
  return (
    <div className={'loginActionRow__RowContainer'}>
      {signin_or_signout}
      {signup_or_logged_in}
    </div>
  );
};
