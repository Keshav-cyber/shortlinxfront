import React from 'react'

import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className=" top-0 left-0 right-0 z-50  shadow-lg border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" style={{ textDecoration: 'none' }} className="flex items-center hover:opacity-80 transition-opacity no-underline">
            <div className="text-bg-gradient-to-r from-cyan-500 to-blue-500 text-2xl font-bold tracking-wide">SHORTLINX</div>
          </Link>
          <div className="flex space-x-8">
            {/* <Link to="/" style={{ textDecoration: 'none' }} >
            <div className="textbg-gradient-to-r from-cyan-500 to-blue-500 text-2xl font-bold tracking-wide">Home</div>
            </Link> */}
            <Link to="/blog" style={{ textDecoration: 'none' }} className="text-bg-gradient-to-r from-cyan-500 to-blue-500 text-2xl font-bold tracking-wide">Details</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav