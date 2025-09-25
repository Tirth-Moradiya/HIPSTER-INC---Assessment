import { useEffect, useState } from 'react'
import { fetchBlogs } from '../utils/api'
import BlogCard from '../components/BlogCard'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    setStatus('loading')
    fetchBlogs()
      .then((data) => {
        if (!isActive) return
        setPosts(data)
        setStatus('success')
      })
      .catch((e) => {
        if (!isActive) return
        setError(e.message || 'Error loading blogs')
        setStatus('error')
      })
    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="container-responsive py-10">
      <h1 className="text-2xl font-bold tracking-tight">Blog</h1>

      {status === 'loading' && <p className="mt-6 text-gray-600">Loading posts...</p>}
      {status === 'error' && <p className="mt-6 text-red-600">{error}</p>}
      {status === 'success' && posts.length === 0 && (
        <p className="mt-6 text-gray-600">No blog posts yet.</p>
      )}

      {status === 'success' && posts.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <li key={p.id}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}


