import React from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

import FreelanceProfileSubmission from './freelance-profile-view';
import { TRIPLE_COLOR_TOP_BORDER, TEXT_S, MODAL_PROFILE_CONTENT } from '../../utils/constants';
import { updateByPropertyName } from '../../utils/funcs';
import { firebase, posts_ref, db } from '../../utils/db';

const paddingHorizontal = { paddingLeft: '5px', paddingRight: '5px' };

const paddingVertical = { paddingTop: '5px' };

const textarea_s = {
  margin: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'white',
  boxShadow: 'none',
  resize: 'none',
};

const red_x_s = {
  cursor: 'pointer',
  paddingLeft: '8px',
  paddingRight: '8px',
};

const flex_column = { display: 'flex', flexDirection: 'column' };

const weighted = { fontWeight: 600 };

const date_and_currency = { ...flex_column, height: '100%', justifyContent: 'center' };

const flexed_column = { ...flex_column, flex: 1, height: '100%' };

const flexed_with_between = { display: 'flex' };

const obj_to_array = obj => Object.keys(obj).map(key => ({ ...obj[key], users_post_key: key }));

const PostingRecord = ({ record, delete_record }) => {
  const {
    creation_time,
    short_job_description,
    payment_currency,
    job_location,
    salary_from,
    salary_to,
  } = record;
  const post_day = format(new Date(creation_time), 'DD/MMM');
  return (
    <div className={'Profile__PostingRecord'}>
      <div style={date_and_currency}>
        <span style={paddingHorizontal}>{post_day}</span>
        <span style={paddingHorizontal}>{payment_currency}</span>
      </div>
      <div style={flexed_column}>
        <textarea readOnly={true} defaultValue={short_job_description} style={textarea_s} />
        <div style={flexed_with_between}>
          <span style={weighted}>{job_location}</span>
          <span style={weighted}>
            {salary_from}
            {' ≤ '}Salary{' ≤ '}
            {salary_to}
          </span>
        </div>
      </div>
      <span style={red_x_s} onClick={delete_record}>
        {'❌'}
      </span>
    </div>
  );
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

  static contextTypes = { authenticated_user: PropTypes.object };

  query_for_data = uid => db.ref(`users/${uid}/posts`).once('value');

  componentDidMount() {
    const { current_user } = this.state;
    if (current_user) {
      this.query_for_data(current_user.uid)
        .then(rows => {
          const data = rows.val();
          if (data) {
            this.setState(() => ({ data: obj_to_array(data), data_loaded: true }));
          } else {
            this.setState(() => ({ data_loaded: true }));
          }
        })
        .catch(error => this.setState(updateByPropertyName('error', error.message)));
    } else {
      this.setState(updateByPropertyName('error', user_not_logged_in));
    }
  }

  delete_job_posting(post_key, users_post_key) {
    const { current_user } = this.state;
    const { force_query } = this.props;
    posts_ref
      .child(post_key)
      .remove()
      .then(() =>
        db
          .ref(`users/${current_user.uid}/posts`)
          .child(users_post_key)
          .remove()
          .then(() =>
            this.query_for_data(current_user.uid).then(rows => {
              const data = rows.val();
              if (data) {
                this.setState(() => ({ data: obj_to_array(data) }));
              }
            })
          )
      )
      .then(force_query)
      .catch(err => console.log({ err }));
  }

  make_profile_view() {
    const { self_freelance_posting, delete_my_freelance_posting } = this.props;
    const profile_made_on =
      this.state.current_user !== null
        ? format(this.state.current_user.metadata.creationTime, 'DD/MMM/YYYY/')
        : '';
    const account_name =
      this.context.authenticated_user !== null ? this.context.authenticated_user.email_account : '';

    let content = null;

    switch (this.props.profile_content) {
      case MODAL_PROFILE_CONTENT.FREELANCER_POSTING:
        content = (
          <FreelanceProfileSubmission
            delete_posting_handler={delete_my_freelance_posting}
            self_freelance_posting={self_freelance_posting}
          />
        );
        break;
      case MODAL_PROFILE_CONTENT.HIRING_BOARD_LISTINGS:
        content =
          this.state.data.length !== 0 ? (
            <div>
              <p style={{ textAlign: 'center', fontWeight: 700, ...paddingVertical }}>
                All My Job Postings
              </p>
              {this.state.data.map(job => (
                <PostingRecord
                  delete_record={this.delete_job_posting.bind(
                    this,
                    job.post_key,
                    job.users_post_key
                  )}
                  key={job.post_key}
                  record={job}
                />
              ))}
            </div>
          ) : (
            no_postings_yet
          );
        break;
      default:
        console.warn(`this is wrong`);
    }

    return (
      <div>
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
    const content = this.make_profile_view();
    return (
      <div
        className={'ReactModal__Content--after-open Profile__Container'}
        style={TRIPLE_COLOR_TOP_BORDER}>
        {content}
      </div>
    );
  }
}
