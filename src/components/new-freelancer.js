import React from 'react';

import { FANCY_INPUT_BOXES } from '../utils/constants';
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
  state = { ...INIT_STATE };

  submit_new_freelancer = e => {
    e.preventDefault();
    console.log(this.state);
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
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.GITHUB}
                query_field={() => this.state.github_link}
                on_change={event =>
                  this.setState(updateByPropertyName('github_link', event.target.value))
                }
                label={'Github'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.LINKEDIN}
                query_field={() => this.state.linkedin_link}
                on_change={event =>
                  this.setState(updateByPropertyName('linkedin_link', event.target.value))
                }
                label={'Linkedin'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.RESUME_OR_PERSONAL}
                query_field={() => this.state.resume_link}
                on_change={event =>
                  this.setState(updateByPropertyName('resume_link', event.target.value))
                }
                label={'Resume/Personal site'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.KNOWN_TECHS}
                query_field={() => this.state.known_technologies}
                on_change={event =>
                  this.setState(updateByPropertyName('known_technologies', event.target.value))
                }
                label={'Known Technologies, comma-separated'}
              />
              <textarea
                onChange={event =>
                  this.setState(updateByPropertyName('self_description', event.target.value))
                }
                maxLength={1500}
                rows={7}
                placeholder={'Describe yourself for employers...(1500 char max)'}
                value={this.state.self_description}
              />
              <input
                className={'NewFreelancerFormContainer__SubmitButton'}
                type={'submit'}
                value={'Submit'}
              />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
