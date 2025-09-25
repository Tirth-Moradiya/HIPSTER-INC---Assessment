export default function FilterBar({ query, setQuery, category, setCategory, price, setPrice, categories }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search services"
        className="w-full sm:w-64 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        aria-label="Search services"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        aria-label="Filter by category"
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        aria-label="Filter by price range"
      >
        <option value="all">All prices</option>
        <option value="0-50">$0 - $50</option>
        <option value="50-100">$50 - $100</option>
        <option value="100-200">$100 - $200</option>
        <option value=">=200">$200+</option>
      </select>
    </div>
  )
}


