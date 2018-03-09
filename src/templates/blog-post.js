import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import EffectiveDiscussionsCommentsIframe from 'gatsby-plugin-ed-comments';

import { rhythm, scale } from '../utils/typography';

const post_style = {
  ...scale(-1 / 5),
  display: 'block',
  marginBottom: rhythm(1),
  marginTop: rhythm(-1),
};

const with_bottom_margin = { marginBottom: rhythm(1) };

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { title, tags, author, date } = post.frontmatter;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    return (
      <div>
        <Helmet title={`${title} | ${siteTitle}`} />
        <h1>{title}</h1>
        <p style={post_style}>
          {date} | By {author} | {tags}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={with_bottom_margin} />
        <EffectiveDiscussionsCommentsIframe discussionId={post.frontmatter.discussionId} />
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        tags
        author
        date(formatString: "MMMM DD, YYYY")
        discussionId
      }
    }
  }
`;
