import React from 'react';

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
    const { box_name, on_change, label } = this.props;
    return (
      <div className="InputEffect">
        <input
          onBlur={this.on_blur}
          onChange={on_change}
          className={`effect-${box_name} ${this.state.content_classname}`}
          type={'text'}
        />
        <label>{label}</label>
        <span className="focus-border">
          <i />
        </span>
      </div>
    );
  }
}
