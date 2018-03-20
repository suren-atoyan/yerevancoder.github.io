import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Headroom from 'react-headroom';

import Bio from '../components/Bio';
import { rhythm } from '../utils/typography';

// import 'prismjs/themes/prism-solarizedlight.css';

const with_margin_bottom = { marginBottom: rhythm(1 / 4) };

class BlogIndex extends React.Component {
  state = { showing_header: false };

  unpinned = () => this.setState(() => ({ showing_header: true }));

  unfixed = () => this.setState(() => ({ showing_header: false }));

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    return (
      <div>
        <Helmet title={siteTitle} />
        {posts.map(({ node }) => {
          const { title, tags, author, date } = node.frontmatter;
          return (
            <div key={node.fields.slug}>
              <h3 style={with_margin_bottom}>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {date} | {node.wordCount.words} words | {node.timeToRead} minutes to read | {author}{' '}
                | {tags}
              </small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
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
