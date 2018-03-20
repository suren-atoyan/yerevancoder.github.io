import React from 'react';
import color from 'color';

export const ROUTES = {
  JOBS_TABLE: '/hiring-board',
  NEW_JOB_POSTING: '/new-job-posting',
  NEWS: '/news',
  AVAILABLE_FOR_WORK: '/available-for-work',
};

export const ROW = { display: 'flex', justifyContent: 'space-between' };

export const TEXT_S = { fontFamily: 'Montserrat, sans-serif' };

export const DISPLAY_FLEX_S = { display: 'flex' };

export const SUMMARY_LIMIT = 120;

export const JOB_POSTING_DESCRIPTION_LIMIT = 1000;

export const SPACER_30_H = <div style={{ height: '30px', width: '100%' }} />;

export const SPACER_10_H = <div style={{ height: '10px', width: '100%' }} />;

const MODAL_TRANSITION = 450;

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

const SIDEBAR_FIXED_WIDTH = 250;

const BUSINESS_CONTENT_PADDING = 30;

const MATERIAL_BLUE = `#37425D`;

const MATERIAL_BEIGE = `#FAF5F1`;

const MATERIAL_GREY = `#C5C9CF`;

const GLOBAL_CSS = `
body {
  background-color: ${MATERIAL_BEIGE};
}

input[type=button], input[type=submit] {
  margin:0;
  border: 0;
  border-radius: 5px;
  padding: 3px 15px;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 1%, 0.20);
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

.loginActionRow__RowContainer {
  margin:0;
  display:inline-flex;
  padding:10px;
}

.loginActionRow__RowContainer > input:nth-child(2n) {
  margin-left:1rem;
}

.loginActionRow__RowContainer > input {
  position: relative;
  font-family: Montserrat, sans-serif;
  display: flex;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  border-bottom: 4px solid rgba(0, 0, 0, 0.33);
  transition: box-shadow 0.15s ease-in-out;
}

.loginActionRow__RowContainer > input:active {
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.33);
  top: 0.5rem;
}

.loginActionRow__RowContainer > input:active:before {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  height: 100%;
  width: 100%;
}

.loginActionRow__SignUpOrLoggedIn--UserSignedIn,
.loginActionRow__SignUpOrLoggedIn--UserSignedOut {
  color:white;
  background-color:${color(MATERIAL_BLUE)
    .fade(0.2)
    .hsl()
    .string()};
}

.loginActionRow__SignUpOrLoggedIn--UserSignedIn,
.loginActionRow__SignUpOrLoggedIn--UserSignedOut:active {
  background-color:${color(MATERIAL_BLUE)
    .fade(0.4)
    .hsl()
    .string()};
}

.loginActionRow__SigninOrSignOut--UserSignedIn,
.loginActionRow__SigninOrSignOut--UserSignedOut {
  background-color:${color(MATERIAL_GREY)
    .fade(0.7)
    .hsl()
    .string()}
}

.loginActionRow__SigninOrSignOut--UserSignedIn,
.loginActionRow__SigninOrSignOut--UserSignedOut:active {
  background-color:${color(MATERIAL_GREY)
    .fade(0.9)
    .hsl()
    .string()}
}

.AvailableForWorkContainer {

}

.AvailableForWorkContainer > * {
  margin:0;
}

.AvailableForWorkContainer__PageBanner {
  margin:0;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:20px;
}

.AvailableForWorkContainer > *:nth-child(1) {
  display:flex;
  justify-content:space-between;
}

.JobPostingCard > * {
  margin:0;
}

.BlogEntryCard > * {
  margin:0;
  font-family: Montserrat, sans-serif;
}

.BlogEntryCard__Byline, .BlogEntryCard__Excerpt {
  font-family:Merriweather;
}

.BlogEntryCard__Excerpt {
  font-weight: 500;
}

.BlogEntryCard:nth-child(2n) {
  background-color:${color(MATERIAL_GREY)
    .fade(0.6)
    .hsl()
    .string()};
  border-radius:5px;
}

.BlogEntryCard {
  padding:12px;
  margin-bottom:1rem;
}

.JobPostingCard {
  box-shadow: 3px 3px 5px 6px #ccc;
  border-radius: 5px;
  margin-bottom:20px;
  padding:5px;
}

.InformationBar {
  display:flex;
  flex-direction:column;
}
.InformationBar > * {
  font-family: Montserrat, sans-serif;
  margin:0;
  color:${MATERIAL_BLUE};
  font-weight:600;
}
.Headroom__Container {
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 1%;
  transition: all .1s ease-in-out;
}

.Headroom__Container--ShowingHeader {
  background-color: hsla(247.5, 50%, 3.1%, 0.9);
  display: flex;
  color: white;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
}

.ApplicationContainer__Container {
  display:flex;
  padding:0;
}

.ApplicationContainer__MainContent {
  display:flex;
  background-color:${MATERIAL_BEIGE};
  flex-direction:column;
}

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
  padding-top:10px;
  display:flex;
  flex-direction:column;
  background-color: hsl(220, 12%, 95%);
  overflow-y: scroll;
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

@media (min-width: 650px) and (orientation: landscape) {
  .NewsPageContainer {
    background-color:red;
    height:100vh;
  }
  .NewsPageContainer__FixedSubmitFooter {
    background-color:blue;
    position: fixed;
    bottom:0;
    width:calc(100% - ${SIDEBAR_FIXED_WIDTH}px - ${BUSINESS_CONTENT_PADDING * 2}px);
  }
  .InformationBar__SiteBannerName {
    font-size:30px;
  }
  .InformationBar > * {
    text-shadow: 2px 2px 3px gold;
  }
  .InformationBar {
    position: fixed;
    justify-content:space-around;
    z-index:99;
    left:0;
    bottom:0;
    top:0;
    background: linear-gradient(
      to bottom,
      ${MATERIAL_GREY},
      ${MATERIAL_GREY} 50%,
      ${MATERIAL_BEIGE} 50%,
      ${MATERIAL_BEIGE}
    );
    background-size: 100% 20px;
    width:${SIDEBAR_FIXED_WIDTH}px;
    padding:10px;
  }

  .ApplicationContainer__MainContent {
    padding-left:${SIDEBAR_FIXED_WIDTH}px;
    width:100%;
  }

  .ApplicationContainer__BusinessContent {
    padding-left:${BUSINESS_CONTENT_PADDING}px;
    padding-right:${BUSINESS_CONTENT_PADDING}px;
  }

  .Profile__User > * {

  }
  .Profile__User {
    justify-content:space-between;
  }
  legend {
    font-size:32px;
  }

  .ReactModal__Content--after-open.SigninForm__Container {
    width:375px;
  }

  .ReactModal__Content--after-open.Profile__Container {
    width:600px;
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
  .AvailableForWorkContainer > *:nth-child(1) {
    flex-direction:column;
    justify-content:flex-start;
  }

  .InformationBar {
    border-bottom-width:1px;
    border-bottom-style:inset;
    border-bottom-color: black;
    background-color: ${MATERIAL_BEIGE};
    justify-content:space-between;
    margin:0;
  }
  .InformationBar > *:not(h3) {
    font-size:11px;
    padding-bottom:10px;
  }
  .InformationBar__SiteBannerName {
    font-weight:700;
    padding-bottom:10px;
  }
  .ApplicationContainer__MainContent {

  }

  .Headroom__Container--ShowingHeader > * {
    font-size:3px;
  }

  .ApplicationContainer__Container {
    flex-direction:column;
    padding:4px;
  }

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
