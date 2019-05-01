import React from "react"

import * as S from "../components/styles.css"

const Pagination = ({ numPages, currentPage, contextPage }) => {
  if (numPages <= 1) {
    return null
  }

  return (
    <S.Pagination>
      {Array.from({ length: numPages }).map((item, i) => {
        const index = i + 1

        const baseLink = `/blog/${contextPage ? `${contextPage}/` : ""}`
        const link = index === 1 ? baseLink : `${baseLink}page/${index}`

        return (
          <S.PaginationItem current={currentPage === index} key={link}>
            {currentPage === index ? (
              <span>{index}</span>
            ) : (
              <a href={link}>{index}</a>
            )}
          </S.PaginationItem>
        )
      })}
    </S.Pagination>
  )
}

export default Pagination
