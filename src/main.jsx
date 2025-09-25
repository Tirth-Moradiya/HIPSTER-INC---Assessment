import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Suspense fallback={<div className="container-responsive py-10">Loading...</div>}><Home /></Suspense> },
      { path: 'services', element: <Suspense fallback={<div className="container-responsive py-10">Loading...</div>}><Services /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<div className="container-responsive py-10">Loading...</div>}><Blog /></Suspense> },
      { path: 'blog/:slug', element: <Suspense fallback={<div className="container-responsive py-10">Loading...</div>}><BlogDetail /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<div className="container-responsive py-10">Loading...</div>}><Contact /></Suspense> },
      { path: '*', element: <Suspense fallback={<div className="container-responsive py-10">Loading...</div>}><NotFound /></Suspense> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
