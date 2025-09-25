import { NavLink } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative">
      <div className="container-responsive py-20 sm:py-28 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Service Manager
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover services, explore our blog, and get in touch — all in one place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <NavLink to="/services" className="inline-flex rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Browse Services</NavLink>
          <NavLink to="/blog" className="inline-flex rounded-md border border-gray-300 px-5 py-3 text-gray-800 hover:bg-gray-50">Read Blog</NavLink>
        </div>
      </div>
    </section>
  )
}


