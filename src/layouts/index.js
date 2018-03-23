import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { auth, freelancers_posts_ref, db, firebase, hiring_table_posts_ref } from '../utils/db';
import FixedSidebar from '../components/fixed-sidebar';
import { SESSION_USER, global_styles, ROUTES } from '../utils/constants';
import { query_my_freelance_submission } from '../utils/funcs';

const link_style = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' };

const yc = (
  <Link style={link_style} to={'/'}>
    yerevancoder
  </Link>
);

const INIT_STATE = { authenticated_user: null, remember_me_checked: false };

export default class ApplicationRoot extends React.Component {
  state = { ...INIT_STATE };

  static childContextTypes = {
    authenticated_user: PropTypes.object,
    sign_user_in: PropTypes.func,
    sign_user_up: PropTypes.func,
    sign_user_out: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
    submit_new_hiring_post: PropTypes.func,
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
      sign_user_up: (given_username, given_email, given_password, user_receives_blog_newsletter) =>
        firebase
          .auth()
          .createUserAndRetrieveDataWithEmailAndPassword(given_email, given_password)
          .catch(error => {
            throw new Error(`Could not sign you up because:\n${error.message}`);
          })
          .then(reply => {
            return db
              .ref(`signed-up-users/${reply.uid}`)
              .set({ user_receives_blog_newsletter, given_email, given_username });
          })
          .then(() => {
            const current_user = firebase.auth().currentUser;
            return current_user.updateProfile({
              displayName: given_username,
            });
          }),
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
      submit_new_hiring_post: hiring_post =>
        hiring_table_posts_ref.push(hiring_post).then(reply => {
          const { uid } = self.state.authenticated_user;
          return db
            .ref(`users/${uid}/my-hiring-board-submissions`)
            .push({ ...hiring_post, post_key: reply.key });
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
        <Helmet title={site_title}>
          {global_styles}
          <link
            rel={'stylesheet'}
            href={'https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css'}
          />
        </Helmet>
        <FixedSidebar authors_count={authors_count} header_content={yc} />
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
