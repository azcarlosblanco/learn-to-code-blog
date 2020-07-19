import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PaginationPosts from "../components/paginationPosts"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div class="container w-full md:max-w-6xl mx-auto">
        <article className="w-full px-4 md:px-6 text-xl py-16 leading-normal">
          <header className="pb-8">
            <p><span class="text-base md:text-sm text-teal-500 font-bold">&lt;</span><a href="/" class="text-base md:text-sm text-teal-500 font-bold no-underline hover:underline">Volver al inicio</a></p>
            <h1 class="font-bold break-normal pt-6 pb-2 text-3xl md:text-4xl">{post.frontmatter.title}</h1>
            <p class="text-sm md:text-base font-normal">{post.frontmatter.date}</p>
          </header>
          <section className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <PaginationPosts pageContext={pageContext} />
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
