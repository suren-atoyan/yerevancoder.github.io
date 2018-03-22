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
  error: null,
};

// const field_mapping = {
//   name: 'Your Name',
//   github_link: 'Github Link '
// }

export default class NewFreelancerEntry extends React.Component {
  state = { ...INIT_STATE };

  submit_new_freelancer = e => {
    e.preventDefault();
    const { submit_new_freelancer_post, freelancer_post_did_finish } = this.props;
    const { error, ...useful_data } = this.state;
    // let missing_field = null;
    // Object.keys(useful_data).forEach(k => {
    //   if (k === '') missing_field = k;
    // });

    // if (missing_field) {
    //   this.setState(() => ({error:`Missing entry for ${field_mapping[missing_field]}`}))
    // } else {

    submit_new_freelancer_post(useful_data)
      .then(() => this.setState(() => ({ ...INIT_STATE })))
      .then(freelancer_post_did_finish)
      .catch(error => this.setState(updateByPropertyName('error', error)));
    // }
  };

  render() {
    const { error } = this.state;
    return (
      <div className={'NewFreelancerFormContainer'}>
        <form onSubmit={this.submit_new_freelancer}>
          <fieldset disabled={this.context.authenticated_user === null}>
            <legend
              className={
                error
                  ? 'NewFreelancerFormContainer__GuidingLegend--Error'
                  : 'NewFreelancerFormContainer__GuidingLegend--Success'
              }>
              {error ? error.message : 'Let employers find you'}
            </legend>
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
                input_type={'url'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.LINKEDIN}
                query_field={() => this.state.linkedin_link}
                on_change={event =>
                  this.setState(updateByPropertyName('linkedin_link', event.target.value))
                }
                label={'Linkedin'}
                input_type={'url'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.RESUME_OR_PERSONAL}
                query_field={() => this.state.resume_link}
                on_change={event =>
                  this.setState(updateByPropertyName('resume_link', event.target.value))
                }
                label={'Resume/Personal site'}
                input_type={'url'}
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
