import React from 'react';

import { SPACER_20_W, FANCY_INPUT_BOXES } from '../utils/constants';
import { updateByPropertyName } from '../utils/funcs';
import WithEffectInput from './with-effect-input';

const INIT_STATE = {
  name: '',
  github_link: '',
  linkedin_link: '',
  resume_link: '',
  self_description: '',
  known_technologies: '',
};

export default class NewFreelancerEntry extends React.Component {
  state = { ...INIT_STATE, has_content_classname: '' };

  submit_new_freelancer = () => {
    //
  };

  test = () => {
    if (this.state.name !== '') {
      this.setState(() => ({ has_content_classname: 'has-content' }));
    } else {
      this.setState(() => ({ has_content_classname: '' }));
    }
  };

  render() {
    return (
      <div className={'NewFreelancerFormContainer'}>
        <form onSubmit={this.submit_new_freelancer}>
          <fieldset disabled={this.context.authenticated_user === null}>
            <legend>Let employers find you</legend>
            <div className={'FreelancerTable__FreelancerColumnDescription'}>
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NAME}
                query_field={() => this.state.name}
                on_change={event => this.setState(updateByPropertyName('name', event.target.value))}
                label={'Your name'}
              />
              <div className={'FreelancerTable__FlexRow'}>
                <div className={'FreelancerTable__FlexColumn'}>
                  <div className={'PlainFlexRow FlexSpaceBetween'}>
                    <WithEffectInput
                      box_name={FANCY_INPUT_BOXES.GITHUB}
                      query_field={() => this.state.github_link}
                      on_change={event =>
                        this.setState(updateByPropertyName('github_link', event.target.value))
                      }
                      label={'Github'}
                    />
                  </div>
                  <div className={'PlainFlexRow FlexSpaceBetween'}>
                    <WithEffectInput
                      box_name={FANCY_INPUT_BOXES.LINKEDIN}
                      query_field={() => this.state.linkedin_link}
                      on_change={event =>
                        this.setState(updateByPropertyName('linkedin_link', event.target.value))
                      }
                      label={'Linkedin'}
                    />
                  </div>
                </div>
                <div className={'FreelancerTable__FlexColumn'}>
                  <div className={'PlainFlexRow FlexSpaceBetween'}>
                    <WithEffectInput
                      box_name={FANCY_INPUT_BOXES.RESUME_OR_PERSONAL}
                      query_field={() => this.state.resume_link}
                      on_change={event =>
                        this.setState(updateByPropertyName('resume_link', event.target.value))
                      }
                      label={'Resume/Personal site'}
                    />
                  </div>
                  <div className={'PlainFlexRow FlexSpaceBetween'}>
                    <WithEffectInput
                      box_name={FANCY_INPUT_BOXES.KNOWN_TECHS}
                      query_field={() => this.state.known_technologies}
                      on_change={event =>
                        this.setState(
                          updateByPropertyName('known_technologies', event.target.value)
                        )
                      }
                      label={'Known Technologies, comma-separated'}
                    />
                  </div>
                </div>
              </div>
              <textarea rows={7} value={this.state.self_description} />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
