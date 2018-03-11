import React from 'react';
import Link from 'gatsby-link';
import { Container } from 'react-responsive-grid';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { rhythm, scale } from '../utils/typography';
import {
  MODAL_TRANSITION,
  SESSION_USER,
  MODAL_CSS,
  LARGER_CHECKBOX_CSS,
  MEDIA_QUERIES,
  GLOBAL_CSS,
} from '../utils/constants';

const link_style = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' };
const header_style_root = { ...scale(1.5), marginBottom: rhythm(1.5), marginTop: 0 };

const header_style = {
  fontFamily: 'Montserrat, sans-serif',
  marginTop: 0,
  marginBottom: rhythm(-1),
};

const global_styles = (
  <style>{`${GLOBAL_CSS}${MODAL_CSS}${LARGER_CHECKBOX_CSS}${MEDIA_QUERIES}`}</style>
);

const yc = (
  <Link style={link_style} to={'/'}>
    yerevancoder
  </Link>
);

const container_style = { maxWidth: rhythm(35), padding: `${rhythm(1.5)} ${rhythm(3 / 4)}` };

export default class ApplicationRoot extends React.Component {
  state = { authenticated_user: null };

  static childContextTypes = {
    authenticated_user: PropTypes.object,
    userDidAuthSuccessfully: PropTypes.func,
    do_signout: PropTypes.func,
  };

  componentDidMount() {
    const existing_user = sessionStorage.getItem(SESSION_USER);
    if (existing_user) {
      this.setState(() => ({ authenticated_user: JSON.parse(existing_user) }));
    }
  }

  handle_session_storage(remember_me_checked, authed_user_data) {
    if (remember_me_checked) {
      sessionStorage.setItem(SESSION_USER, JSON.stringify(authed_user_data));
    }
  }

  getChildContext() {
    const didAuth = (authed_user_data, after_cb, remember_me_checked = false) =>
      this.setState(
        () => ({ authenticated_user: { ...authed_user_data } }),
        () => {
          this.handle_session_storage(remember_me_checked, JSON.parse(remember_me_checked));
          after_cb(authed_user_data.email_account);
        }
      );
    const do_signout = () => {
      sessionStorage.removeItem(SESSION_USER);
      this.setState(() => ({ authenticated_user: null }));
    };
    return {
      authenticated_user: this.state.authenticated_user,
      userDidAuthSuccessfully: didAuth,
      do_signout,
    };
  }

  render() {
    const { location, children } = this.props;
    let header = null;
    if (location.pathname === '/') {
      header = <h1 style={header_style_root}>{yc}</h1>;
    } else {
      header = <h3 style={header_style}>{yc}</h3>;
    }
    return (
      <Container style={container_style}>
        <Helmet>{global_styles}</Helmet>
        {header}
        {children()}
      </Container>
    );
  }
}
