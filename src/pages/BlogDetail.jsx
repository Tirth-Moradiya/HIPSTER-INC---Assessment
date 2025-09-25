import { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { fetchBlogs } from '../utils/api'
import DOMPurify from 'dompurify'

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    setStatus('loading')
    fetchBlogs()
      .then((data) => {
        if (!isActive) return
        const found = data.find((b) => b.slug === slug)
        if (!found) throw new Error('Post not found')
        setPost(found)
        setStatus('success')
      })
      .catch((e) => {
        if (!isActive) return
        setError(e.message || 'Error loading blog')
        setStatus('error')
      })
    return () => {
      isActive = false
    }
  }, [slug])

  return (
    <section className="container-responsive py-10">
      <div className="max-w-3xl mx-auto">
        <NavLink to="/blog" className="no-underline text-sm text-blue-600">← Back to blog</NavLink>
        {status === 'loading' && <p className="mt-6 text-gray-600">Loading...</p>}
        {status === 'error' && <p className="mt-6 text-red-600">{error}</p>}
        {status === 'success' && post && (
          <article className="mt-6">
            {post.image && (
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded" />
            )}
            <h1 className="mt-6 text-3xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{new Date(post.date).toLocaleDateString()}</p>

            {/* Render HTML content safely */}
            <div
              className="prose mt-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.description || post.content || ''),
              }}
            />
          </article>
        )}
      </div>
    </section>
  )
}
