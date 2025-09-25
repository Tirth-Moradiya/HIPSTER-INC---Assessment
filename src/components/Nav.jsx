import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container-responsive h-16 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-semibold tracking-tight hover:text-blue-600">Service Manager</NavLink>
        <nav aria-label="Primary" className="flex gap-6">
          <NavLink to="/" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Services</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Blog</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}


