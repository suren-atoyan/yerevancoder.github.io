import React from 'react';
import format from 'date-fns/format';

import FreelanceProfileSubmission from './freelance-profile-view';
import HiringSubmissionsProfile from './hiring-submissions-profile-view';
import { MODAL_PROFILE_CONTENT } from '../../utils/constants';
import { updateByPropertyName } from '../../utils/funcs';

const user_not_logged_in = 'User not logged in, cannot show profile';

export default class ProfileControl extends React.Component {
  make_profile_view() {
    const {
      self_freelance_posting,
      delete_my_freelance_posting,
      authenticated_user,
      delete_hiring_record,
      my_hiring_submissions,
    } = this.props;
    const profile_made_on =
      authenticated_user !== null
        ? format(authenticated_user.metadata.creationTime, 'DD/MMM/YYYY/')
        : '';
    const account_name = authenticated_user !== null ? authenticated_user.email : '';
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
        content = (
          <HiringSubmissionsProfile
            delete_record={delete_hiring_record}
            my_hiring_submissions={my_hiring_submissions}
          />
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
    return <div className={'ReactModal__Content--after-open Profile__Container'}>{content}</div>;
  }
}
