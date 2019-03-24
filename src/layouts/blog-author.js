import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"

import Seo from "../components/seo"

const BlogAuhor = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data

  return (
    <>
      <Seo title={pageContext.author} />
      <h1>Authors:</h1>
      {pageContext.allAuthors.map(aut => (
        <Link to={`/blog/author/${kebabCase(aut)}`}>{aut}</Link>
      ))}
      <br />

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
        {Array.from({ length: pageContext.numPages }).map((item, i) => {
          const index = i + 1
          const author = kebabCase(pageContext.author)
          const link =
            index === 1
              ? `/blog/author/${author}`
              : `/blog/author/${author}/page/${index}`

          return (
            <li>
              {pageContext.currentPage === index ? (
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

export default BlogAuhor

export const query = graphql`
  query blogPostsListByAuthor($author: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { in: [$author] } } }
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
