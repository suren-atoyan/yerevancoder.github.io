import React from 'react';
import Link from 'gatsby-link';
import addDays from 'date-fns/add_days';

import { rhythm } from '../utils/typography';
import JobsTable from '../components/jobs-table';
import { posts_ref } from '../utils/db';

const s = { marginTop: rhythm(1.5) };

export default class HiringBoard extends React.Component {
  state = { jobs: [] };

  async componentDidMount() {
    posts_ref.once('value', snap_shot => {
      const rows = snap_shot.val();
      this.setState(() => ({ jobs: Object.values(rows) }));
    });
  }

  render() {
    return (
      <div style={s}>
        <JobsTable all_jobs={this.state.jobs} />
      </div>
    );
  }
}
