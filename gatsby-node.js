const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const kebabCase = require(`lodash.kebabcase`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogLayout = path.resolve(`./src/layouts/blog-post.js`)
  const blogListLayout = path.resolve(`./src/layouts/blog-list.js`)
  const blogCategoryLayout = path.resolve(`./src/layouts/blog-category.js`)
  const blogAuthorLayout = path.resolve(`./src/layouts/blog-author.js`)

  return graphql(`
    query blogPosts {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
              featured
              image {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            html
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.error(result.errors)
      reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 3
    const postsWithoutFeatured = posts.filter(({ node }) => {
      return !node.frontmatter.featured
    })
    const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage)
    const categories = []
    const authors = []

    // Creating blog list with pagination
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
        component: blogListLayout,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages,
        },
      })
    })

    // Creating blog posts
    posts.forEach((post, index, arr) => {
      post.node.frontmatter.category.forEach(cat => categories.push(cat))
      authors.push(post.node.frontmatter.author)

      const prev = arr[index - 1]
      const next = arr[index + 1]

      createPage({
        path: post.node.fields.slug,
        component: blogLayout,
        context: {
          slug: post.node.fields.slug,
          prev: prev,
          next: next,
        },
      })
    })

    // Creating category page
    const countCategories = categories.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})
    const allCategories = Object.keys(countCategories)

    allCategories.forEach((cat, i) => {
      const link = `/blog/category/${kebabCase(cat)}`

      Array.from({
        length: Math.ceil(countCategories[cat] / postsPerPage),
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogCategoryLayout,
          context: {
            allCategories: allCategories,
            category: cat,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages: Math.ceil(countCategories[cat] / postsPerPage),
          },
        })
      })
    })

    // Creating author page
    const countAuthor = authors.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})
    const allAuthors = Object.keys(countAuthor)

    allAuthors.forEach((aut, i) => {
      const link = `/blog/author/${kebabCase(aut)}`

      Array.from({
        length: Math.ceil(countAuthor[aut] / postsPerPage),
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogAuthorLayout,
          context: {
            allAuthors: allAuthors,
            author: aut,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages: Math.ceil(countAuthor[aut] / postsPerPage),
          },
        })
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    const [month, day, year] = new Date(node.frontmatter.date)
      .toLocaleDateString("en-EN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
    const slug = value.replace("/blog/", "").replace(/\/$/, "")
    const url = `/blog/${year}/${month}/${day}${slug}`

    createNodeField({
      name: `slug`,
      node,
      value: url,
    })
  }
}
