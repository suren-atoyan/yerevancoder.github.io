import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';
import Link from 'gatsby-link';
import SigninBar from '../components/signin-bar';

// import 'prismjs/themes/prism-solarizedlight.css';

export default ({ data }, context) => {
  const posts = data.allMarkdownRemark.edges;
  const { authenticated_user } = context;
  return (
    <div>
      <div className={'BlogIndex__TopCredentialBar'}>
        <SigninBar
          signin_handler={null}
          signup_handler={null}
          signout_handler={null}
          signed_in_handler={null}
          is_signed_in={authenticated_user !== null}
          when_active_name={authenticated_user ? authenticated_user.email : ''}
          custom_input_handler_signedin={null}
          custom_input_handler_signedout={null}
          custom_input_signed_in_name={null}
          custom_input_signed_out_name={null}
        />
      </div>
      {posts.map(({ node }) => {
        const { title, tags, author, date } = node.frontmatter;
        return (
          <div key={node.fields.slug} className={'BlogEntryCard'}>
            <h3 className={'BlogEntryCard__Banner'}>
              <Link to={node.fields.slug}>{title}</Link>
            </h3>
            <small className={'BlogEntryCard__Byline'}>
              {date} | {node.wordCount.words} words | {node.timeToRead} minutes to read | {author} |{' '}
              {tags}
            </small>
            <p
              className={'BlogEntryCard__Excerpt'}
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
          </div>
        );
      })}
    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          wordCount {
            words
          }
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
            author
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
