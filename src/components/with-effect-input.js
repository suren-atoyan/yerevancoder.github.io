import React from 'react';

import { FANCY_INPUT_BOXES } from '../utils/constants';

export default class WithEffectInput extends React.Component {
  state = { content_classname: '' };

  on_blur = () => {
    if (this.props.query_field() !== '') {
      this.setState(() => ({ content_classname: 'has-content' }));
    } else {
      this.setState(() => ({ content_classname: '' }));
    }
  };

  render() {
    const { box_name, on_change, label, input_type } = this.props;

    const valid_names = new Set(Object.values(FANCY_INPUT_BOXES));
    if (valid_names.has(box_name) === false) {
      console.warn(`Unknown box_name ${box_name} requested, is CSS right?`);
    }

    return (
      <div className={'InputEffect'}>
        <input
          onBlur={this.on_blur}
          onChange={on_change}
          className={`effect-${box_name} ${this.state.content_classname}`}
          type={input_type}
        />
        <label className={'InputEffect__Label'}>{label}</label>
        <span className="focus-border">
          <i />
        </span>
      </div>
    );
  }
}
