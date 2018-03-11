import React from 'react';

export const ROUTES = {
  JOBS_TABLE: '/hiring-board',
  NEW_JOB_POSTING: '/new-job-posting',
};

export const ROW = { display: 'flex', justifyContent: 'space-between' };

export const TEXT_S = { fontFamily: 'Montserrat, sans-serif' };

export const DISPLAY_FLEX_S = { display: 'flex' };

export const SUMMARY_LIMIT = 120;

export const JOB_POSTING_DESCRIPTION_LIMIT = 1000;

export const SPACER_30_H = <div style={{ height: '30px', width: '100%' }} />;

export const SPACER_10_H = <div style={{ height: '10px', width: '100%' }} />;

export const MODAL_TRANSITION = 450;

export const NO_MARGIN_BOTTOM = { marginBottom: 0 };

export const SESSION_USER = 'yerevan-coder-authed-user';

export const ARMENIA_COLORS = { red: '#ec493c', blue: '#0c5fa1', orange: '#f58f31' };

export const GLOBAL_CSS = `
.loginActionRow__GetHiredText {
  margin-bottom:0;
  font-family: Montserrat, sans-serif;
}

input[type=button], input[type=submit] {
  border: 0;
  border-radius: 5px;
  padding: 3px 15px;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 1%, 0.20);
  background-color: hsl(220, 12%, 95%);
}
`;

export const MODAL_CSS = `
.ReactModal__Content {
  opacity: 0;
}

.ReactModal__Content--after-open {
  opacity: 1;
  transition: opacity ${MODAL_TRANSITION}ms;
}

.ReactModal__Content--before-close {
  opacity: 0;
}`;

export const MEDIA_QUERIES = `
.loginActionRow__Container, .loginActionRow__AuthingButtons {
  display:flex;
}

@media (min-width: 620px) {
  .loginActionRow__GetHiredText {
    font-size:24px;
  }

  .loginActionRow__Container, .loginActionRow__AuthingButtons {
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
  }
}

@media (max-width: 619px) {
  .ReactModal__Content--after-open {
    width:90%;
  }
  .loginActionRow__GetHiredText {
    font-size:39px;
  }
  .loginActionRow__Container, .loginActionRow__AuthingButtons {
    flex-direction:column;
    text-align:center;
  }
  input[type=button] {
    margin-top:10px;
  }
}
`;

export const LARGER_CHECKBOX_CSS = `
@supports (zoom:2) {
	input[type="radio"],  input[type=checkbox]{
	  zoom: 1.3;
	}
}

@supports not (zoom:2) {
	input[type="radio"],  input[type=checkbox]{
		transform: scale(1.3);
	}
}
`;
