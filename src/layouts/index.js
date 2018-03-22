import React from 'react';
import Link from 'gatsby-link';
import { Container } from 'react-responsive-grid';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { auth, freelancers_posts_ref, db } from '../utils/db';
import { rhythm, scale } from '../utils/typography';
import { SESSION_USER, global_styles, ROUTES } from '../utils/constants';
import { query_my_freelance_submission } from '../utils/funcs';

const link_style = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' };

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

const INIT_STATE = { authenticated_user: null, remember_me_checked: false };

export default class ApplicationRoot extends React.Component {
  state = { ...INIT_STATE };

  static childContextTypes = {
    authenticated_user: PropTypes.object,
    sign_user_in: PropTypes.func,
    sign_user_out: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
  };

  componentDidMount() {
    // const existing_user = sessionStorage.getItem(SESSION_USER);
    // if (existing_user) {
    //   const authenticated_user = JSON.parse(existing_user);
    //   console.log({ authenticated_user });
    // this.setState(() => ({ authenticated_user }));
    // }
  }

  handle_session_storage(remember_me_checked, authed_user_data) {
    if (remember_me_checked) {
      sessionStorage.setItem(SESSION_USER, JSON.stringify(authed_user_data));
    }
  }

  getChildContext() {
    const self = this;
    return {
      authenticated_user: self.state.authenticated_user,
      sign_user_in: (email, password, remember_me_checked) =>
        auth
          .signInWithEmailAndPassword(email, password)
          .then(
            ({
              displayName,
              email,
              emailVerified,
              metadata,
              phoneNumber,
              photoURL,
              refreshToken,
              uid,
            }) =>
              self.setState(() => ({
                remember_me_checked,
                authenticated_user: {
                  displayName,
                  email,
                  emailVerified,
                  metadata,
                  phoneNumber,
                  photoURL,
                  refreshToken,
                  uid,
                },
              }))
          ),
      sign_user_out: () =>
        auth.signOut().then(() => {
          this.setState(() => ({ ...INIT_STATE }));
        }),
      submit_new_freelancer_post: data =>
        query_my_freelance_submission().then(profile => {
          if (profile === null) {
            return freelancers_posts_ref.push(data).then(reply => {
              const { uid } = self.state.authenticated_user;
              return db
                .ref(`users/${uid}/my-freelance-submission`)
                .set({ ...data, post_key: reply.key });
            });
          } else {
            throw new Error('Profile already exists, delete existing one first');
          }
        }),
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
