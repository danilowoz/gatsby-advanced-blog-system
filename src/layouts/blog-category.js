import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"

import Seo from "../components/seo"

const BlogCategory = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data

  return (
    <>
      <Seo title={pageContext.category} />
      <h1>Categories:</h1>
      {pageContext.allCategories.map(cat => (
        <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
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
          const category = kebabCase(pageContext.category)
          const link =
            index === 1
              ? `/blog/category/${category}`
              : `/blog/category/${category}/page/${index}`

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

export default BlogCategory

export const query = graphql`
  query blogPostsListByCategory($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
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
