import React from 'react';

export default ({ disabled, value }) => (
  <input className={'SubmitInput'} disabled={disabled} type={'submit'} value={value} />
);
