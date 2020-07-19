import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import '../styles/styles.css'
import '../styles/github-markdown.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [theme, setTheme] = useState('theme-light')

  const handleOnChageTheme = () => {
    if (theme === 'theme-light') {
      setTheme('theme-dark')
    } else {
      setTheme('theme-light')
    }
  }

  return (
    <div class={`content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen ${theme}`}>
      <Header theme={theme} handleOnChageTheme={handleOnChageTheme} />
      <main class="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout