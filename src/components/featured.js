import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link, useStaticQuery } from "gatsby"

import Seo from "../components/seo"

const BlogFeatured = ({ pageContext }) => {
  const { markdownRemark } = useStaticQuery(graphql`
    query BlogFeatured {
      markdownRemark(frontmatter: { featured: { eq: true } }) {
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
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
  `)
  const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src

  return (
    <>
      <Seo title={markdownRemark.frontmatter.title} />
      <img src={imageSource} alt={markdownRemark.frontmatter.title} />
      <h1>{markdownRemark.frontmatter.title}</h1>
      <p>{markdownRemark.frontmatter.date}</p>
      <p>
        By{" "}
        <Link
          to={`/blog/author/${kebabCase(markdownRemark.frontmatter.author)}`}
        >
          {markdownRemark.frontmatter.author}
        </Link>
      </p>
      <p>
        In:{" "}
        {markdownRemark.frontmatter.category.map(cat => (
          <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
        ))}
      </p>
      <hr />
    </>
  )
}

export default BlogFeatured
