import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-responsive py-20 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-2 text-gray-600">This page could not be found.</p>
      <NavLink to="/" className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Go home</NavLink>
    </section>
  )
}


