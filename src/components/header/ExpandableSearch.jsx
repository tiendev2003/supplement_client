"use client"

import { Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function ExpandableSearch() {
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef, isExpanded])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle search submission here
    console.log("Search submitted:", inputRef.current?.value)
    setIsExpanded(false)
  }

  return (
    <div className="relative">
      <button
        className={`transition-colors hover:text-gray-600 ${isExpanded ? "hidden" : "block"}`}
        onClick={() => setIsExpanded(true)}
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-white px-4 py-6 md:absolute md:inset-auto md:right-0 md:top-full md:mt-1 md:w-80 md:rounded-lg md:shadow-lg">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 focus:border-gray-500 focus:outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Submit search">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </form>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="absolute right-4 top-4 md:right-2 md:top-2"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

