import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Header = ({ theme , handleOnChageTheme}) => {
    const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)|(jpeg)/" }
          relativeDirectory: { eq: "logo" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const [open, setOpen] = useState(false)

  return (   
    <header className="border-t-14 border-brand">
      <nav className="container mx-auto flex flex-wrap justify-between items-center py-4">
        <div>
          <Link to="/">
            {theme === 'theme-light' 
              ? <Img  fluid={data.allFile.edges[0].node.childImageSharp.fluid}  className="w-64" alt="logo" />
              : <Img  fluid={data.allFile.edges[1].node.childImageSharp.fluid}  className="w-64" alt="logo" />}
          </Link>
        </div>
        <div className="block lg:hidden">
          <button onClick={() => setOpen(!open)} className="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600">
            <svg className="current-color h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="gray" /></svg>
          </button>
        </div>
        <ul className={`uppercase tracking-wide font-bold w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0 ${open ? 'block' : 'hidden'}`}>
          <li className="mb-6 lg:mb-0">
            {/* <search-input /> */}
          </li>
          <li>
            <ThemeSwitcher theme={theme} handleOnChageTheme={handleOnChageTheme} />
          </li>
          <li>
            <Link to="/#projects" className="text-copy-primary hover:text-gray-600">Comenzar</Link>
          </li>
          <li>
            <Link to="/#about" className="text-copy-primary hover:text-gray-600">PHP</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

const ThemeSwitcher = ({ theme , handleOnChageTheme}) => {
  const hadleOnClick = event => {
    event.preventDefault();
    handleOnChageTheme();
  }

  return (
    <a href="#" class="text-copy-primary hover:text-gray-600" onClick={hadleOnClick}>
      {theme === 'theme-light' 
        ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>}    
    </a>
  )
}

export default Header
