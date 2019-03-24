import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"

import Seo from "../components/seo"

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { prev, next } = pageContext
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
          <Link key={cat} to={`/blog/category/${kebabCase(cat)}`}>
            {cat}
          </Link>
        ))}
      </p>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />

      {prev && (
        <Link to={prev.node.fields.slug}>
          {"<"} {prev.node.frontmatter.title}
        </Link>
      )}

      {next && (
        <Link to={next.node.fields.slug}>
          {next.node.frontmatter.title} {">"}
        </Link>
      )}
    </>
  )
}

export default BlogPost

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
`
