import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PaginationPosts from "../components/paginationPosts"
import SideBar from "../components/sideBar"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16">
        <SideBar currentPost={post} />
        <div className="w-full lg:w-4/5 px-8">
          <article className="px-4 md:px-6 text-xl py-16 leading-normal">
            <header className="pb-8">
              <p className="text-cta hover:text-brand "><span className="text-base md:text-sm text-teal-500 font-bold mr-2">«</span><Link to="/" className="no-underline md:text-sm font-bold">Volver al inicio</Link></p>
              <h1 className="font-bold break-normal pt-6 pb-2 text-3xl md:text-4xl">{post.frontmatter.title}</h1>
              <p className="text-sm md:text-base font-normal">{post.frontmatter.date}</p>
            </header>
            <section className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>

          <PaginationPosts pageContext={pageContext} />
        </div>
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
