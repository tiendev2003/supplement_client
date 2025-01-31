import { SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { FilterSidebar } from '../../components/product/FilterSidebar'
import { ProductGrid } from '../../components/product/ProductGrid'
import { ViewToggle } from '../../components/product/ViewToggle'
import { SortSelect } from '../../components/product/sortSelect'

const ShopPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [view, setView] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Mobile Filter Button */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          {/* Sidebar */}
          <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

          {/* Main Content */}
          <main>
            <div className="mb-8 hidden items-center justify-between lg:flex">
              <h1 className="text-2xl font-bold">Living Room</h1>
              <div className="flex items-center gap-4">
                <SortSelect value={sortBy} onChange={setSortBy} />
                <ViewToggle value={view} onChange={setView} />
              </div>
            </div>

            <ProductGrid view={view} />
          </main>
        </div>
      </div>
    </div>
  )
}

export default ShopPage