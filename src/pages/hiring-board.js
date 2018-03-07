import React from 'react';
import Link from 'gatsby-link';

import { rhythm } from '../utils/typography';
import JobsTable from '../components/jobs-table';

const s = { marginTop: rhythm(1.5) };

export default class HiringBoard extends React.Component {
  state = { jobs: [] };

  fetchJobs = async () => {
    //
  };

  render() {
    return (
      <div style={s}>
        <JobsTable all_jobs={this.state.jobs} />
      </div>
    );
  }
}
