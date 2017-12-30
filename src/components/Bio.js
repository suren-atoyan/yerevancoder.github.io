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
    <span>
      <p>
        yerevancoder.com-ը հարթակ է հայ ծրագրավորողների համար, որտեղ կարելի է կիսվել ծրագրավորման և
        տեխնոլոգիաների մասին Ձեր մտքերով և փորձով․
      </p>
      <p>
        yerevancoder.com is a place for coders in Armenia to share their thoughts, experiences in
        programming and tech. We are always looking for contributors, add a post{' '}
        <a href={'https://github.com/yerevancoder/yerevancoder.github.io'}>here</a>.
      </p>
    </span>
  </div>
);
