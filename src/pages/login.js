import React from 'react';
import Link from 'gatsby-link';

import LoginForm from '../components/login';
import { rhythm } from '../utils/typography';

const s = { marginTop: rhythm(1.5) };

const block_s = { flexDirection: 'column', backgroundColor: 'aliceblue', flex: 1, display: 'flex' };

export default () => (
  <div style={s}>
    <LoginForm />
    <div style={block_s}>
      <Link to={'/forgot-password'}>forgot password</Link>
      <Link to={'/signup'}>sign up link</Link>
    </div>
  </div>
);
