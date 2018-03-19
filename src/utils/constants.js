import React from 'react';
import color from 'color';

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

export const TRIPLE_COLOR_TOP_BORDER = {
  borderTop: '10px solid',
  borderImage: `linear-gradient(to right,
${ARMENIA_COLORS.red} 33%,
${ARMENIA_COLORS.blue} 33%,
${ARMENIA_COLORS.blue} 66%,
${ARMENIA_COLORS.orange} 66%) 5`,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
};

export const FORM_BASE_STYLE = {
  ...NO_MARGIN_BOTTOM,
  ...TRIPLE_COLOR_TOP_BORDER,
};

export const LIGHT_BLUE = color(ARMENIA_COLORS.blue)
  .lighten(0.9)
  .fade(0.4)
  .hsl()
  .string();

const GLOBAL_CSS = `
.Profile__Container > * {
  margin:0;
  font-family: Montserrat, sans-serif;
}

.Profile__Container {
  padding:15px;
}

.Profile__User {
  background-color:hsl(220, 12%, 95%);
  padding:10px;
  display:flex;
}

.Profile__PostingsTable {
  height:400px;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  background-color: hsl(220, 12%, 95%);
  overflow-y: scroll;
  padding-top:135px;
}

.Profile__PostingRecord {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content:center;
  border-bottom-width:10px;
}

legend {
  margin-bottom:0;
  font-family: Montserrat, sans-serif;
  padding-left:5px;
  padding-right:5px;
  font-style:italic;
  font-weight:700;
}

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

input[type=text], input[type=password], input[type=email], textarea {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  border: 0;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  font-weight: 400;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 1%, 0.20);
}

.NewJobPosting__SubmitButton {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  font-family: Montserrat, sans-serif;
}

.Profile__CreationTime:nth-child(2) {
  text-align:right;
}
`;

const MODAL_CSS = `
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

const MEDIA_QUERIES_CSS = `
.loginActionRow__Container, .loginActionRow__AuthingButtons {
  display:flex;
}

@media (min-width: 650px) {
  .Profile__User > * {

  }
  .Profile__User {
    justify-content:space-between;
  }
  legend {
    font-size:32px;
  }
  .ReactModal__Content--after-open {
    width:60%;
  }
  .loginActionRow__GetHiredText {
    font-size:24px;
  }
  .loginActionRow__Container, .loginActionRow__AuthingButtons {
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
  }
}

@media (max-width: 649px) {
  .Profile__User > div {
    flex-direction:column;
    align-items:center;
  }
  legend {
    font-size:20px;
  }
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

const LARGER_CHECKBOX_CSS = `
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

export const global_styles = (
  <style>{`${GLOBAL_CSS}${MODAL_CSS}${LARGER_CHECKBOX_CSS}${MEDIA_QUERIES_CSS}`}</style>
);
