import React from 'react'

function stripHtml(html) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export default function ServiceCard({ service }) {
  const titleText =
    typeof service.title === 'object' ? service.title?.rendered || '' : service.title || ''
  
  const contentText =
    typeof service.description === 'object'
      ? stripHtml(service.description?.rendered || '')
      : stripHtml(service.description || '')

  // Use the image returned from fetchServices
  const imageUrl = service?.image || '/vite.svg'

  // Category & Price
  const category = service?.category || 'Services'
  const price = service?.price || null

  return (
    <article className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <img
        src={imageUrl}
        alt={titleText}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/vite.svg'
        }}
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{titleText}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{contentText}</p>

        {category && (
          <p className="mt-2 text-sm text-gray-500">
            <strong>Category:</strong> {category}
          </p>
        )}

        {price && (
          <p className="mt-1 text-sm text-gray-500">
            <strong>Price:</strong> ₹{price}
          </p>
        )}
      </div>
    </article>
  )
}
