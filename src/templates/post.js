import React from 'react';
import PropType from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

// const stripHtml = (html) => {
//   if (typeof window !== 'undefined') {
//     const doc = new DOMParser().parseFromString(html, 'text/html');
//     return doc.body.textContent || '';
//   }
//   return html;
// };
const PostTemplate = (props) => {
  const { data: { wordpressPost: post } } = props;
  return (
    <Layout>
      <Helmet
        title={post.title}
        meta={[
          { name: 'description', content: post.excerpt },
        ]}
      />
      <Link to="/blog/">Go Back</Link>
      <article>
        <header>
          <div className="background-bar">
            { post.featured_media && (
            <Img
              src={post.featured_media.localFile.childImageSharp.sizes.src}
              sizes={post.featured_media.localFile.childImageSharp.sizes}
              className="img-fluid"
              alt={post.title}
            />
            )}
            <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
          </div>
        </header>
        <section className="container-fluid main-body">
          <section className="row">
            <div className="hidden-xs col-sm-1 col-md-2" />
            <div className="col-xs-12 col-sm-10 col-md-8">
              <div className="content-holder">
                <div className="content-description">
                  <div className="author-social author-social-left">
                    <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFy0lEQVRoQ9WZe2zTVRTHv+d2G2OMCQyyEd4KE9CQiBGEdgQXCYGgiERYO0QY0DLnI+IMPjApxsQYAY0bsHY8zV4oSsJLo8EsaQcYnVEUIkwCEhhD5obycl17j/l1G2zr69ffb2vc758l+53zPedzz/3de+4toZsfY+72/sLjHSd9nEpCJJOEAOEGS74WRzhbVWFr6M6QpFdsqrkkLZ7kfAKymGECYVg4TZL4ywc+ZhD0rc+H/Uf32M7qyUEjAJPR4pgjIPJ98M0WEAbNSZA8CibH7WSqqHHaWqLViRog0+KcLcHvEfBQtMHC2TNwXoDWuzLqPoHdLtVqqwaY+czm9Jb4uCICFqoV12RH8iiBVrnKVp9S468KYIa5JEuStxwQaWpE9dvIWwRDvqvcuiuSVkSATLNjJTMcEBCRxLr7PYE3uDLq14abUmEBjBZnAYE/6O7EotFjybuqx9evCAUREsA/8oSSaIL1lC0xPnJVWNcAxF1jBAXwz3mW3+idNkIQRgy9B4NSkmAwECQzWML/92rjTdT9+Y96ZqZ8d4V1S0QAZbXxxouf9HywiX3i8NxTk/Fk1gSkJPcJmmTl4RPYXHZcPQCkh4SY5iq1/djRKaACRotjr56lsl9SAgrXPYFxo1LDJhc9AADGr7f7Y3LHDa8TgLJJMfirKIYlwPRN20zMmZERUUITgKJKKHCX2Ta2B+gAoLQHzho9O+yQgf2wt9ACQRFXZ2gFkBJNlBQ3qnrHiuutPG2P0VI8l0CHIg5dGANl5JUKhHqkvLuI7Dl8AlsqvtMYjl93l69+vxNApsV5iMFzNSr63ayLHsGz8wNbpGaPF6ve3odzF5v0yHfwlRfcGVfGKHuDvwLKyuOJFxd1dZUA8nMeRfbcSQFJ1p5vQO5bX3RT8m0yQj7mLs2r8gOYLA4rAIfeCKEATp9rwMp13QtAQJGr3PaiHyDT4qhkYHFvAvAxTh2rsD3QWgGz42Kkk1QouAn3DsHo4QP9rx+fNhZTJg0PMK1vuIEdn//Q6f9nLzTizHl9p0tPXMtgmprzcUo89/lb6+iHmjaR9ApLj+HTL3+JZBb2vZBkpMwljsksUaNVSSuAvfAIjhzXdRwGgZaT0Vw8i4i+jjXAC+/sx8+n67WGbfUjFJApx7kAzJqXCK0VyF5TiUtXouhGg6Oup0yzcyET79U6FFoBZi3fgX89Xq1h2/zoXeqOBq49i1juA/4ZRFhLpmzHVAhE05iHHLVYAwCw0UyzY7CXcFVnLf3usQZgIKt1J852NLBA+BOICsKYA8i4YX6A6dnFB4SgeSpyDGsSUwCJP9yV1jHtvdArDGzqVQDATne5LdcPMG3JtrEG6avtVQBET7vLrPvunMhMOVurwWK6HojYTSHZ2NSSOvTkZ4s8dwEsxUsB2t0rAFhudFfkFbR2E23Pw1ZHfOINnCFgtFaIWFRAAs0GgTGuUtvlTgD+5dTiXMbgnf9nAHQY/QAA2O3CVJvm0vot9HwFZB0nJoxvv1IJBFCqkFM8kZm/B0RStJXoaQCSmOeqtHW6+gl6A6V1KvUkgP+3gvLVr3Ud1JBXaCbz1g0g8Wo0VegpACn5YEJ9/YKqKntA/x36DtBuF8bf0reToGVqIe4bOQgj0gcEmF+/2Yyak5fUynSx87lvJxtm1zhtt4IJhL/EVD7qM+mbAHpZY3RdbsrIN6fQ4lDJB/2IAyMymcwleSDfh4BI0JVRFM7KnDfU1b8RbNp0lIl8jdxm7b+98GE3CA9GkYcGU1kHMtjcZdaDapxVAyhiym7d9yZekl5eJwwUONnVRAxho+ywgmUR901Y33GdjyQZFUC7WOtlWEIewM8DYmSkIOHfy0YwdpJBbGxvD6LR0wRwJ4Dykf+eNoOkWOhlZBkIE9UFlxcAcQREB5o8Aw4pXaU6v0ArfQBd9KYsLUpN9CTczwIZTJwKRn+ADER8nRnXGKiFjDtdXZl7OdhPplog/gO1E3B/GI/WqQAAAABJRU5ErkJggg==" />
                    <img alt="" src="data:image/png;base64,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" />
                    <img alt="" src="data:image/png;base64,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" />
                  </div>
                  <div className="author-social author-social-right">
                    <img alt="" src="data:image/png;base64,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" />
                    <img alt="" src="data:image/png;base64,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" />
                    <img alt="" src="data:image/png;base64,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" />
                  </div>
                  <div className="author-avatar">
                    <img alt="" src={post.author.avatar_urls.wordpress_48} className="img-circle" />
                  </div>
                  <div className="author-name">
                    <h3>{post.author.name}</h3>
                  </div>
                  <div className="row blog-info">
                    <div className="col-xs-12 col-sm-6">
                      <span className="lead text-muted">
                        <i className="fa fa-clock-o" />
                        {' '}
Published:
                        {' '}
                        {post.date}
                      </span>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <span className="lead text-muted">
                        <i className="fa fa-tags" />
                        {post.categories && post.categories.map(category => category.name)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="content-body">
                  <p dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>
            </div>
            <div className="hidden-xs col-sm-1 col-md-2" />
          </section>
        </section>
      </article>
    </Layout>
  );
};
PostTemplate.propTypes = {
  data: PropType.shape({}).isRequired,
};
export default PostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
        title
        content
        excerpt
        date(formatString: "DD, MMM YYYY")
        categories {
            id
            name
        }
        tags {
            id
            name     
        }
        author{
            name
            description
            avatar_urls{
              wordpress_48
            }
        }
        featured_media{
          localFile{
            childImageSharp{
              id
              sizes( maxWidth: 800 ) {
                  ...GatsbyImageSharpSizes
              }
            }
          }
        }
        slug
    }
  }
`;
