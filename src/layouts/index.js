import React from 'react';
import Link from 'gatsby-link';
import { Container } from 'react-responsive-grid';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { rhythm, scale } from '../utils/typography';
import { SESSION_USER, global_styles, ROUTES } from '../utils/constants';

const link_style = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' };
const header_style_root = { ...scale(1.5), marginBottom: rhythm(1.5), marginTop: 0 };

const yc = (
  <Link style={link_style} to={'/'}>
    yerevancoder
  </Link>
);

const container_style = { maxWidth: rhythm(35), padding: `${rhythm(1.5)} ${rhythm(3 / 4)}` };

const FixedSideBar = ({ authors_count }) => (
  <aside className={'InformationBar'}>
    <h3 className={'InformationBar__SiteBannerName'}>{yc}</h3>
    <p>
      yerevancoder.com is a place for coders in Armenia to share their thoughts, experiences in
      programming and tech.
    </p>
    <p>
      {authors_count} coders have already contributed and we are always looking for more
      contributors, use this <Link to={'/2018-03-13-how-yerevan-coder-works/'}>post</Link> as a
      guide on how to add a new blog post and check out this{' '}
      <Link to={'/2017-12-21-javascript-resources/'}>post</Link> for many inpage lecture notes on
      learning JavaScript, consider checking out the source code{' '}
      <a href={'https://github.com/yerevancoder/yerevancoder.github.io'}>here</a>.
    </p>
    <p>
      Find <Link to={ROUTES.AVAILABLE_FOR_WORK}>someone</Link> looking for a job, or post a tech job
      on our <Link to={ROUTES.JOBS_TABLE}>hiring board</Link>.
    </p>
  </aside>
);

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
    const didAuth = (authed_user_data, after_cb = null, remember_me_checked = false) =>
      this.setState(
        () => ({ authenticated_user: { ...authed_user_data } }),
        () => {
          this.handle_session_storage(remember_me_checked, JSON.parse(remember_me_checked));
          after_cb && after_cb(authed_user_data.email_account);
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
    const { children, location } = this.props;
    const site_title = this.props.data.site.siteMetadata.title;
    const posts = this.props.data.allMarkdownRemark.edges;
    const all_authors = new Set(posts.map(({ node }) => node.timeToRead));
    const authors_count = all_authors.size;
    return (
      <div className={'ApplicationContainer__Container'}>
        <Helmet title={site_title}>{global_styles}</Helmet>
        <FixedSideBar authors_count={authors_count} />
        <div className={'ApplicationContainer__MainContent'}>
          <div className={'ApplicationContainer__BusinessContent'}>{children()}</div>
        </div>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery_ {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
        }
      }
    }
  }
`;
