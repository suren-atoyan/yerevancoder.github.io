import React from 'react';
import Link from 'gatsby-link';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import { rhythm } from '../utils/typography';

const base_bio_style = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem',
  marginRight: '1rem',
  marginTop: '1rem',
};

const spacing_style = { marginBottom: rhythm(1.0) };

export default ({ style = {}, authors_count }) => (
  <div style={{ ...base_bio_style, ...style }}>
    <span style={spacing_style}>
      yerevancoder.com is a place for coders in Armenia to share their thoughts, experiences in
      programming and tech. {authors_count} coders have already contributed and we are always
      looking for more contributors, add a post{' '}
      <a href={'https://github.com/yerevancoder/yerevancoder.github.io'}>here</a>
    </span>
    <span>
      Post a tech job on our <Link to={'/hiring-board'}>hiring board</Link>
    </span>
  </div>
);
