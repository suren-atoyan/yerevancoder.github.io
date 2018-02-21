import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import { rhythm } from '../utils/typography';

export default ({ style = {} }) => (
  <div
    style={{
      display: 'flex',
      marginBottom: rhythm(2.5),
      ...style,
    }}>
    <span
      style={{
        margin: '1rem'
      }}
    >
      <div>
        yerevancoder.com is a place for coders in Armenia to share their thoughts, experiences in
        programming and tech. We are always looking for contributors, add a post{' '}
        <a href={'https://github.com/yerevancoder/yerevancoder.github.io'}>here</a>.
      </div>
    </span>
  </div>
);
