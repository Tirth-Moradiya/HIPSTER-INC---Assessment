import { useEffect, useMemo, useState } from 'react'
import { fetchServices } from '../utils/api'
import ServiceCard from '../components/ServiceCard'
import FilterBar from '../components/FilterBar'

export default function Services() {
  const [services, setServices] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [price, setPrice] = useState('all')
  const [status, setStatus] = useState('idle') // idle | loading | error | success
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    setStatus('loading')
    fetchServices()
      .then((data) => {
        if (!isActive) return
        setServices(data)
        setStatus('success')
      })
      .catch((e) => {
        if (!isActive) return
        setError(e.message || 'Error loading services')
        setStatus('error')
      })
    return () => {
      isActive = false
    }
  }, [])

  const categories = useMemo(() => {
    const set = new Set(
      services
        .map((s) => s.category)
        .filter((c) => typeof c === 'string' && c.trim().length > 0)
    )
    return ['all', ...Array.from(set)]
  }, [services])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return services.filter((s) => {
      const titleText = typeof s.title === 'object' ? (s.title?.rendered || '') : (s.title || '')
      const contentHtml = s?.content?.rendered || s?.description || ''
      const contentText = contentHtml.replace(/<[^>]+>/g, ' ').toLowerCase()
      const matchesQuery = !q || titleText.toLowerCase().includes(q) || contentText.includes(q)
      const matchesCategory = category === 'all' || s.category === category
      const matchesPrice = (() => {
        if (price === 'all' || s.price == null) return true
        if (price === '0-50') return s.price >= 0 && s.price < 50
        if (price === '50-100') return s.price >= 50 && s.price < 100
        if (price === '100-200') return s.price >= 100 && s.price < 200
        if (price === '>=200') return s.price >= 200
        return true
      })()
      return matchesQuery && matchesCategory && matchesPrice
    })
  }, [services, query, category])

  return (
    <section className="container-responsive py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-gray-600">Find the right service for your needs.</p>
        </div>
        <FilterBar
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          price={price}
          setPrice={setPrice}
          categories={categories}
        />
      </div>

      {status === 'loading' && <p className="mt-6 text-gray-600">Loading services...</p>}
      {status === 'error' && <p className="mt-6 text-red-600">{error}</p>}
      {status === 'success' && filtered.length === 0 && (
        <p className="mt-6 text-gray-600">No services match your filters.</p>
      )}

      {status === 'success' && filtered.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}

    </section>
  )
}


