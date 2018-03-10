import React from 'react';
import Link from 'gatsby-link';
import { Container } from 'react-responsive-grid';
import PropTypes from 'prop-types';

import { rhythm, scale } from '../utils/typography';

const link_style = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' };
const header_style_root = { ...scale(1.5), marginBottom: rhythm(1.5), marginTop: 0 };

const header_style = {
  fontFamily: 'Montserrat, sans-serif',
  marginTop: 0,
  marginBottom: rhythm(-1),
};

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
  };

  getChildContext() {
    const didAuth = (authed_user_data, after_cb) =>
      this.setState(
        () => ({ authenticated_user: { ...authed_user_data } }),
        () => {
          after_cb(authed_user_data.email_account);
        }
      );
    return {
      authenticated_user: this.state.authenticated_user,
      userDidAuthSuccessfully: didAuth,
    };
  }

  render() {
    const { location, children } = this.props;
    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    let header = null;
    if (location.pathname === rootPath) {
      header = <h1 style={header_style_root}>{yc}</h1>;
    } else {
      header = <h3 style={header_style}>{yc}</h3>;
    }
    return (
      <Container style={container_style}>
        {header}
        {children()}
      </Container>
    );
  }
}
