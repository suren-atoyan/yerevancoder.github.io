import React from 'react';
import Link from 'gatsby-link';
import { Container } from 'react-responsive-grid';

import { rhythm, scale } from '../utils/typography';

const link_style = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' };

const header_style = {
  fontFamily: 'Montserrat, sans-serif',
  marginTop: 0,
  marginBottom: rhythm(-1),
};

const container_style = { maxWidth: rhythm(35), padding: `${rhythm(1.5)} ${rhythm(3 / 4)}` };

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    let header;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}>
          <Link style={link_style} to={'/'}>
            yerevancoder
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3 style={header_style}>
          <Link style={link_style} to={'/'}>
            yerevancoder
          </Link>
        </h3>
      );
    }
    return (
      <Container style={container_style}>
        {header}
        {children()}
      </Container>
    );
  }
}

export default Template;
