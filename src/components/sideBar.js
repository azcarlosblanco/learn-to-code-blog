import React, { useState, useEffect } from 'react'
import useWindowSize from '../hooks/useWindowsSize';
import { useStaticQuery, graphql, Link } from 'gatsby';

const SideBar = ({ currentPost }) => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query { 
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(php)/"  }}, sort: { fields: [frontmatter___date], order: ASC }) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }
  `)

  const [open, setOpen] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setOpen(false)
  }, [size.width])

  return (
    <div className="w-full lg:w-1/5 px-0 lg:px-6">
      <p className="text-base font-bold py-2 lg:pb-6">Menu</p>
      
      <div className="block lg:hidden sticky">
        <button onClick={() => setOpen(!open)} id="menu-toggle" className="flex w-full justify-end px-3 py-3 border rounded border-gray-400 hover:border-brand appearance-none focus:outline-none">
          <svg className="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>

      <div
        className={`w-full sticky ${open ? 'block' : 'hidden'} h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent shadow lg:shadow-none z-20`}
        style={{top: '5em'}}
        id="menu-content"
      >
        <ul>
          {allMarkdownRemark.edges.map(edge => (
            <li className="py-2 md:my-0 hover:bg-brand lg:hover:bg-transparent cursor-pointer">
              <Link to={edge.node.fields.slug} className={`block pl-4 align-middle no-underline lg:hover:text-brand border-l-4 border-transparent ${edge.node.frontmatter.title === currentPost.frontmatter.title ? 'font-bold lg:border-brand lg:hover:border-brand' : 'lg:hover:border-gray-300'}`}>
                <span className="pb-1 md:pb-0 text-sm">{edge.node.frontmatter.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

SideBar.propTypes = {

}

export default SideBar