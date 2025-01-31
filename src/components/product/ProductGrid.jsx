import { useState } from "react";
import { Pagination } from "./pagination";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
const products = [
  {
    id: 1,
    name: "Loveseat Sofa",
    price: 199.0,
    originalPrice: 400.0,
    image: "/placeholder.svg",
    rating: 5,
    isNew: true,
    discount: 50,
  },
  {
    id: 2,
    name: "Luxury Sofa",
    price: 299.0,
    originalPrice: 500.0,
    image: "/placeholder.svg",
    rating: 5,
    isNew: true,
    discount: 50,
  },
  {
    id: 3,
    name: "Table Lamp",
    price: 19.0,
    image: "/placeholder.svg",
    rating: 5,
    isNew: true,
    discount: 50,
  },
  {
    id: 4,
    name: "White Drawer unit",
    price: 89.99,
    image: "/placeholder.svg",
    rating: 5,
    isNew: true,
    discount: 50,
  },
  {
    id: 5,
    name: "Black Tray table",
    price: 19.99,
    image: "/placeholder.svg",
    rating: 5,
    isNew: true,
    discount: 50,
  },
  {
    id: 6,
    name: "Lamp",
    price: 39.0,
    image: "/placeholder.svg",
    rating: 5,
    isNew: true,
    discount: 50,
  },
];
const ITEMS_PER_PAGE = 6;

export function ProductGrid({ view }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "divide-y"
        }
      >
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className={
              view === "list"
                ? "flex gap-4 py-4 first:pt-0 last:pb-0"
                : "group relative"
            }
          >
            <ProductImage product={product} view={view} />
            <ProductInfo product={product} view={view} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
