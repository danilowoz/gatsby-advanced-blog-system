import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"
import { Row, Cell } from "griding"

import * as S from "../components/styles.css"
import ConcatWords from "../utils/ConcatWords"
import formatDate from "../utils/formatDate"

const renderList = ({ node }) => {
  const imageSource = node.frontmatter.image.childImageSharp.fluid.src

  return (
    <Cell xs={12} key={node.fields.slug}>
      <S.Article>
        <Row>
          <Cell xs={3}>
            <S.Image>
              <Link to={node.fields.slug}>
                <img src={imageSource} alt={node.frontmatter.title} />
              </Link>
            </S.Image>
          </Cell>

          <Cell xs={9}>
            <S.Author>
              By{" "}
              <Link to={`/blog/author/${kebabCase(node.frontmatter.author)}`}>
                {node.frontmatter.author}
              </Link>
            </S.Author>

            <Link to={node.fields.slug}>
              <S.Title>{node.frontmatter.title}</S.Title>
            </Link>

            <S.DateText>{formatDate(node.frontmatter.date)}</S.DateText>

            <S.Category>
              {node.frontmatter.category.map((cat, index, arr) => (
                <ConcatWords arrCount={arr.length} index={index} key={cat}>
                  <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
                </ConcatWords>
              ))}
            </S.Category>
          </Cell>
        </Row>
      </S.Article>
    </Cell>
  )
}

export default renderList
