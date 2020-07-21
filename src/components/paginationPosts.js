import React from 'react'
import { Link } from 'gatsby'

const PaginationPosts = ({ pageContext }) => {
    const { previous, next } = pageContext

    return (
        <nav class="flex justify-between text-xl items-center text-cta hover:text-brand">
          {previous ? (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          ) : <Inicio /> }
          {next ? (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          ) : <Inicio />}
        </nav>
    )
}

const Inicio = () => (
  <Link to="/" rel="home">
     Inicio 🏠
  </Link>
)

export default PaginationPosts
