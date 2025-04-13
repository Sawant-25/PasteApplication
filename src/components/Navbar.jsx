import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-[#1e1e1e] border-b border-gray-700 shadow-md">
 <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
 <h1 className="text-green-400 font-mono text-xl font-bold tracking-wide">
          ⌘ PasteVault
        </h1>
      {/* <NavLink to="/"> Home </NavLink>
      <NavLink to="/pastes"> Pastes </NavLink>
      <NavLink> Home</NavLink> */}
      <div className="flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium font-mono ${
                isActive ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
              }`
            }
          >
            HOME
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-sm font-medium font-mono ${
                isActive ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
              }`
            }
          >
            PASTES
          </NavLink>
        </div>
    </div>
    </nav>
   
  )
}

export default Navbar
