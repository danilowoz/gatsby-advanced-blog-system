import styled, { css } from "styled-components"
import { Cell } from "griding"
import { Link } from "gatsby"

export const Footer = styled.footer`
  text-align: center;
  padding: 1em 0;
`

export const Article = styled.article`
  padding: 4em 0;
  border-bottom: 1px solid #eee;
`

export const Title = styled.h2`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

const infoStyles = css`
  color: #999;
  margin-bottom: 0;
  font-size: 0.8rem;
  display: inline-block;
  margin-right: 2em;

  a {
    color: inherit;
  }
`

export const Author = styled.p`
  ${infoStyles}
`

export const DateText = styled.p`
  ${infoStyles}
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.6em;

  &:after {
    content: "";
    width: 1em;
    display: inline-block;
    border-top: 1px solid #ddd;
    margin-left: 2em;
    position: relative;
    top: -2px;
  }
`

export const Category = styled.p`
  ${infoStyles}
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.6em;
`

export const Image = styled.div`
  margin-left: -5em;
  border-radius: 2px;
  overflow: hidden;

  img {
    display: block;
    margin-bottom: 0;
  }
`

export const FeaturedImage = styled.div`
  margin-left: -1em;
`

export const FeaturedInfos = styled(Cell)`
  margin-top: 25%;
  margin-left: 20%;
  padding-bottom: 25%;
  width: 80%;
  border-bottom: 1px solid #eee;
`

export const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
`

export const PaginationItem = styled.li`
  min-width: 50px;
  margin: -1px 0.5em 0;
  padding: 1em 0;
  text-align: center;
  border-top: 1px solid transparent;

  ${({ current }) =>
    current &&
    css`
      border-top: 1px solid #000;
    `}
`

export const HeaderSectionTitle = styled.h1`
  margin-top: 1em;
`

export const HeaderSectionLink = styled(Link)`
  margin-right: 1em;
`

export const HeaderSectionList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const BlogContent = styled.div`
  margin: 6em 0;
`

export const NavigationPost = styled.div`
  display: flex;
  margin-bottom: 5em;
  padding-top: 3em;
  border-top: 1px solid #eee;

  > div {
    margin: auto;
  }
`
