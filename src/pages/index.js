import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <StaticQuery
  query={graphql`
    query {
      allWordpressPost(sort: { fields: [date] }) {
        edges {
          node {
              month: date(formatString: "MM")
              day: date(formatString: "DD")
              year: date(formatString: "YY")
            title
            excerpt
            author{
              name
            }
            featured_media{
              localFile{
                childImageSharp{
                  id
                  sizes( maxWidth: 1000 ) {
                      ...GatsbyImageSharpSizes
                  }
                }
              }
            }
            slug
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `}
  render = {data => (
      <Layout>
        <Link to="/blog/">Go to Blog</Link>
      </Layout>)
}
/>
)


export default IndexPage
