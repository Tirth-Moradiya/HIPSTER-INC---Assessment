import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container-responsive h-16 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-semibold tracking-tight hover:text-blue-600">Service Manager</NavLink>
        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
        <nav aria-label="Primary" className="hidden sm:flex gap-6">
          <NavLink to="/" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Services</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Blog</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Contact</NavLink>
        </nav>
      </div>
      {open && (
        <div className="sm:hidden border-t bg-white">
          <nav className="container-responsive py-3 flex flex-col gap-3" aria-label="Mobile">
            <NavLink onClick={() => setOpen(false)} to="/" className="text-gray-700 hover:text-blue-600">Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/services" className="text-gray-700 hover:text-blue-600">Services</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/blog" className="text-gray-700 hover:text-blue-600">Blog</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className="text-gray-700 hover:text-blue-600">Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}


