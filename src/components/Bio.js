// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import React from 'react';
import Link from 'gatsby-link';

import { rhythm } from '../utils/typography';
import { ROUTES } from '../utils/constants';

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
      looking for more contributors, use this{' '}
      <a href={'https://yerevancoder.com/2018-03-13-how-yerevan-coder-works/'}>post</a> as a guide
      on how to add a new blog post and check out this{' '}
      <a href={'https://yerevancoder.com/2017-12-21-javascript-resources/'}>post</a> for many inpage
      lecture notes on learning JavaScript.
    </span>
    <span>
      Post a tech job on our <Link to={ROUTES.JOBS_TABLE}>hiring board</Link> and consider checking
      out the source code{' '}
      <a href={'https://github.com/yerevancoder/yerevancoder.github.io'}>here</a>.
    </span>
  </div>
);
