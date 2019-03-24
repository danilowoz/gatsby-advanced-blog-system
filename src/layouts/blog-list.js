import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"

import Seo from "../components/seo"
import Featured from "../components/featured"

const BlogPostList = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { currentPage, numPages } = pageContext

  return (
    <>
      {currentPage === 1 && <Featured />}
      <Seo title="Blog" />
      {allMarkdownRemark.edges.map(({ node }) => {
        const imageSource = node.frontmatter.image.childImageSharp.fluid.src

        return (
          <React.Fragment key={node.fields.slug}>
            <Link to={node.fields.slug}>
              <img src={imageSource} alt={node.frontmatter.title} />
              <h1>{node.frontmatter.title}</h1>
            </Link>
            <p>{node.frontmatter.date}</p>
            <p>
              By{" "}
              <Link to={`/blog/author/${kebabCase(node.frontmatter.author)}`}>
                {node.frontmatter.author}
              </Link>
            </p>
            <p>
              In:{" "}
              {node.frontmatter.category.map(cat => (
                <Link key={cat} to={`/blog/category/${kebabCase(cat)}`}>
                  {cat}
                </Link>
              ))}
            </p>
          </React.Fragment>
        )
      })}

      <ul>
        {Array.from({ length: numPages }).map((item, i) => {
          const index = i + 1
          const link = index === 1 ? "/blog" : `/blog/page/${index}`

          return (
            <li key={link}>
              {currentPage === index ? (
                <span>{index}</span>
              ) : (
                <a href={link}>{index}</a>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default BlogPostList

export const query = graphql`
  query blogPostsList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { featured: { eq: false } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            author
            category
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
