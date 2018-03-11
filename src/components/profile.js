import React from 'react';
import Spinner from 'react-spinner';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

import { TRIPLE_COLOR_TOP_BORDER, TEXT_S } from '../utils/constants';
import { updateByPropertyName } from '../utils/funcs';
import { firebase, posts_ref, db } from '../utils/db';

const posting_record = { backgroundColor: 'aliceblue' };

const PostingRecord = ({ record }) => {
  const {
    post_key,
    creation_time,
    post_author,
    salary_from,
    job_location,
    payment_currency,
    salary_to,
    short_job_description,
  } = record;
  console.log({
    post_key,
    creation_time,
    post_author,
    salary_from,
    job_location,
    payment_currency,
    salary_to,
    short_job_description,
  });
  return <div style={posting_record}>{post_key}</div>;
};

const no_postings_yet = <p style={{ ...TEXT_S, fontWeight: 700 }}>No Postings yet</p>;

const user_not_logged_in = 'User not logged in, cannot show profile';

export default class ProfileControl extends React.Component {
  state = {
    current_user: firebase.auth().currentUser,
    error: null,
    data: [],
    data_loaded: false,
  };

  componentDidMount() {
    const { current_user } = this.state;
    if (current_user) {
      db
        .ref(`users/${current_user.uid}/posts`)
        .once('value')
        .then(rows => {
          const data = rows.val();
          if (data) {
            this.setState(() => ({ data: Object.values(data), data_loaded: true }));
          }
        })
        .catch(error => this.setState(updateByPropertyName('error', error.message)));
    } else {
      this.setState(updateByPropertyName('error', user_not_logged_in));
    }
  }
  static contextTypes = {
    authenticated_user: PropTypes.object,
  };

  make_profile_view() {
    const profile_made_on = format(this.state.current_user.metadata.creationTime, 'DD/MMM/YYYY/');
    const account_name = this.context.authenticated_user.email_account;
    const content =
      this.state.data.length !== 0
        ? this.state.data.map(job => <PostingRecord key={job.post_key} record={job} />)
        : no_postings_yet;

    return (
      <div className={'Profile__Container'}>
        <div className={'Profile__User'}>
          <div>
            <label>Account Name </label>
            <span>{account_name}</span>
          </div>
          <div className={'Profile__CreationTime'}>
            <label>Creation Date </label>
            <span>{profile_made_on}</span>
          </div>
        </div>
        <div className={'Profile__PostingsTable'}>{content}</div>
      </div>
    );
  }

  render() {
    const { current_user, data_loaded } = this.state;
    const content = data_loaded ? this.make_profile_view() : <Spinner />;
    return <div style={TRIPLE_COLOR_TOP_BORDER}>{content}</div>;
  }
}
