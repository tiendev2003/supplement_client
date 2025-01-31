import { Link } from "react-router-dom";

 
 
export function CategoryCard({ title, image, href }) {
  return (
    <Link to={href} className="group relative block overflow-hidden bg-gray-100 hover:bg-gray-50">
      <div className="relative aspect-square md:aspect-[4/3]">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 flex items-center text-sm text-gray-600">
          Shop Now
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </p>
      </div>
    </Link>
  )
}

