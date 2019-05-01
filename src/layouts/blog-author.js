import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql } from "gatsby"
import { Row, Cell } from "griding"

import { Container } from "../components/grid"
import * as S from "../components/styles.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"

const BlogAuhor = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { currentPage, numPages, author, allAuthors } = pageContext

  return (
    <Layout>
      <Seo title={author} />

      <Container>
        <Row>
          <Cell xs={12}>
            <S.HeaderSectionTitle>Authors:</S.HeaderSectionTitle>
            <S.HeaderSectionList>
              {allAuthors.map(cat => (
                <S.HeaderSectionLink to={`/blog/author/${kebabCase(cat)}`}>
                  {cat}
                </S.HeaderSectionLink>
              ))}
            </S.HeaderSectionList>
          </Cell>

          {allMarkdownRemark.edges.map(renderList)}
        </Row>

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={`author/${kebabCase(author)}`}
        />
      </Container>
    </Layout>
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
