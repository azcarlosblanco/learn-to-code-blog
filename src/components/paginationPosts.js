import React from 'react'
import { Link } from 'gatsby'

const PaginationPosts = ({ pageContext }) => {
    const { previous, next } = pageContext

    return (
        <nav class="flex justify-between text-xl items-center">
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </nav>
    )
}

export default PaginationPosts
