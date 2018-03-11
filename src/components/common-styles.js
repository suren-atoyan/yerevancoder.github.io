import React from 'react';
import { TEXT_S, NO_MARGIN_BOTTOM } from '../utils/constants';

export const LOGIN_ENTRY_BOX_PROMPT_S = {
  ...TEXT_S,
  ...NO_MARGIN_BOTTOM,
  textAlign: 'center',
  lineHeight: 'calc(20px - 20%)',
  paddingBottom: '20px',
  fontWeight: 700,
};

export const WIDTH_WITH_MARGIN = { width: '90%', marginLeft: '5%', marginRight: '5%' };

const login_entry_horizontal_bar = {
  ...WIDTH_WITH_MARGIN,
  ...NO_MARGIN_BOTTOM,
  backgroundColor: 'grey',
};

export const BAR = <hr style={login_entry_horizontal_bar} />;

export const SPACE = <div style={{ height: '10px' }} />;

export const LOGIN_ENTRY_BOX_FIELDSET_S = {
  paddingBottom: '10px',
  paddingTop: '20px',
  borderColor: 'transparent',
};
