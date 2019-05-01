import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Row, Cell } from "griding"

import * as S from "../components/styles.css"
import ConcatWords from "../utils/ConcatWords"
import formatDate from "../utils/formatDate"

const BlogFeatured = () => {
  const { markdownRemark } = useStaticQuery(query)
  const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src

  return (
    <Row>
      <Cell md={6}>
        <S.FeaturedImage>
          <Link to={markdownRemark.fields.slug}>
            <img src={imageSource} alt={markdownRemark.frontmatter.title} />
          </Link>
        </S.FeaturedImage>
      </Cell>

      <Cell md={6}>
        <Row>
          <S.FeaturedInfos>
            <S.Author>
              By{" "}
              <Link
                to={`/blog/author/${kebabCase(
                  markdownRemark.frontmatter.author
                )}`}
              >
                {markdownRemark.frontmatter.author}
              </Link>
            </S.Author>

            <Link to={markdownRemark.fields.slug}>
              <S.Title>{markdownRemark.frontmatter.title}</S.Title>
            </Link>

            <S.DateText>
              {formatDate(markdownRemark.frontmatter.date)}
            </S.DateText>

            <S.Category>
              {markdownRemark.frontmatter.category.map((cat, index, arr) => (
                <ConcatWords arrCount={arr.length} index={index} key={cat}>
                  <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
                </ConcatWords>
              ))}
            </S.Category>
          </S.FeaturedInfos>
        </Row>
      </Cell>
    </Row>
  )
}

export default BlogFeatured

const query = graphql`
  query BlogFeatured {
    markdownRemark(frontmatter: { featured: { eq: true } }) {
      html
      fields {
        slug
      }
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
