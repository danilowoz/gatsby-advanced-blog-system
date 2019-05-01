import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"
import { Row, Cell } from "griding"

import * as S from "../components/styles.css"
import { Container } from "../components/grid"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ConcatWords from "../utils/ConcatWords"
import formatDate from "../utils/formatDate"

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { prev, next } = pageContext
  const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src

  return (
    <Layout>
      <Seo title={markdownRemark.frontmatter.title} />

      <Container>
        <img src={imageSource} alt={markdownRemark.frontmatter.title} />

        <S.Author>
          By{" "}
          <Link
            to={`/blog/author/${kebabCase(markdownRemark.frontmatter.author)}`}
          >
            {markdownRemark.frontmatter.author}
          </Link>
        </S.Author>

        <S.Title>{markdownRemark.frontmatter.title}</S.Title>
        <S.DateText>{formatDate(markdownRemark.frontmatter.date)}</S.DateText>

        <S.Category>
          {markdownRemark.frontmatter.category.map((cat, index, arr) => (
            <ConcatWords arrCount={arr.length} index={index} key={cat}>
              <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
            </ConcatWords>
          ))}
        </S.Category>

        <S.BlogContent
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        />

        <Row>
          {prev && (
            <Cell xs={6}>
              <Link to={prev.node.fields.slug}>
                <S.NavigationPost>
                  <div>
                    {" "}
                    {"<"} {prev.node.frontmatter.title}
                  </div>
                </S.NavigationPost>
              </Link>
            </Cell>
          )}

          {next && (
            <Cell xs={6}>
              <Link to={next.node.fields.slug}>
                <S.NavigationPost>
                  <div>
                    {" "}
                    {next.node.frontmatter.title} {">"}
                  </div>
                </S.NavigationPost>
              </Link>
            </Cell>
          )}
        </Row>
      </Container>
    </Layout>
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
