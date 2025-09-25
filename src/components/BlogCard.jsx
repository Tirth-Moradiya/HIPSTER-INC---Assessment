import React from 'react'
import { NavLink } from 'react-router-dom'

function stripHtml(html) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export default function BlogCard({ post }) {
  const titleText = post.title || ''
  const excerptText = post.excerpt
    ? stripHtml(post.excerpt)
    : stripHtml(post.content || '')
  const imageUrl = post.image || '/vite.svg'
  const postDate = post.date ? new Date(post.date).toLocaleDateString() : null

  return (
    <article className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={titleText}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/vite.svg'
          }}
        />
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{titleText}</h3>
        {postDate && <p className="text-xs text-gray-500 mt-1">{postDate}</p>}

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{excerptText}</p>

        {post.slug && (
          <NavLink
            to={`/blog/${post.slug}`}
            className="mt-3 inline-flex text-blue-600 hover:underline"
          >
            Read more
          </NavLink>
        )}
      </div>
    </article>
  )
}
