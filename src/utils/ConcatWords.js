import * as React from "react"

export default ({ arrCount, index, children }) => {
  if (arrCount === 1) {
    return <>{children}</>
  }

  if (index + 2 < arrCount) {
    return <>{children}, </>
  }

  if (index + 1 === arrCount) {
    return (
      <>
        {" "}
        {"&"} {children}
      </>
    )
  }

  return <>{children}</>
}
