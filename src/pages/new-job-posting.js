import React from 'react';
import { withRouter } from 'react-router-dom';

import { rhythm } from '../utils/typography';

const s = { marginTop: rhythm(1.5) };

class NewJobPosting extends React.Component {
  render() {
    return (
      <div style={s}>
        <p>hello world</p>
      </div>
    );
  }
}

export default withRouter(NewJobPosting);
