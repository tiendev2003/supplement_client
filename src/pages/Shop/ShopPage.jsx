import { Grid, List } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import HoverAction from "../../components/product/HoverAction";
import { Pagination } from "../../components/product/Pagination";
import { getCategoryProducts } from "../../features/categoryProduct/categoryProductSlice";
import { getProducts } from "../../features/product/productSlice";
import formatCurrency from "../../utils/formatMoney";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const [view, setView] = React.useState("grid");
  const { categoryProducts } = useSelector((state) => state.categoryProducts);
  const { products, loading, error, total, pages } = useSelector(
    (state) => state.products
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(getCategoryProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) {
      setSelectedCategories([category]);
    }
  }, [location.search]);

  const [sortBy, setSortBy] = useState("alphabetically");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          product.categories.some((category) =>
            selectedCategories.includes(category.slug)
          )) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filtered = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (category) => {
    console.log(category);
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header với breadcrumb và dropdown sắp xếp */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>
        </div>

        <div className="mb-8 hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border bg-white px-4 py-2"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>{" "}
            <div className="flex gap-2">
              <button
                onClick={() => setView("grid")}
                className={`rounded-lg p-2 ${
                  view === "grid"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`rounded-lg p-2 ${
                  view === "list"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid chính */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Danh mục sản phẩm */}
          <div>
            <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
            <ul className="space-y-2">
              {categoryProducts.map((category, index) => (
                <li key={index}>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedCategories.includes(category.slug)}
                      onChange={() => handleCategoryChange(category.slug)}
                    />
                    <span className="flex-1">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      ({category.products.length})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Bộ lọc khoảng giá */}
          <div>
            <h2 className="text-lg font-semibold mb-4">PRICE RANGE</h2>
            <Slider
              range
              min={0}
              max={10000000}
              defaultValue={priceRange}
              onChange={(value) => setPriceRange(value)}
              className="mt-4"
            />
            <div className="flex justify-between mt-2">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </div>
        </aside>

        {/* Grid sản phẩm */}
        <main className="">
          <div className="min-h-screen">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">No products available</p>
            ) : (
              <div
                className={`${
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-6"
                }`}
              >
                {filteredProducts.map((product) => (
                  <Link to={`/shop/${product.slug}`} key={product.product_id}>
                    <div
                      className={`group relative ${
                        view === "list" ? "flex gap-4" : ""
                      }`}
                    >
                      {/* Ảnh sản phẩm */}
                      <div
                        className={`relative aspect-square overflow-hidden rounded-lg ${
                          view === "list" ? "w-1/3" : ""
                        }`}
                      >
                        <img
                          src={
                            import.meta.env.VITE_API_URL +
                              "/" +
                              product.images[0].url || "/placeholder.svg"
                          }
                          alt={product.name}
                          crossOrigin="anonymous"
                          className="object-cover w-full h-full object-center transition-transform group-hover:scale-105"
                        />
                        <div className="absolute left-2 top-2 flex flex-col gap-2">
                          {product.isNew && (
                            <div className="rounded bg-green-400 px-2 py-1 text-xs font-semibold text-white">
                              NEW
                            </div>
                          )}
                          {product.discount && (
                            <div className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                              -{product.discount}%
                            </div>
                          )}
                        </div>
                        <HoverAction />
                      </div>

                      {/* Thông tin sản phẩm */}
                      <div
                        className={`mt-4 space-y-2 ${
                          view === "list" ? "w-2/3" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>
                        <h3 className="text-sm font-medium">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">
                            {formatCurrency(
                              (product.price * (100 - product.discount)) / 100
                            )}
                          </p>
                          {product.discount && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatCurrency(product.price)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}{" "}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={pages}
            onPageChange={setCurrentPage}
          />{" "}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
