import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from "@headlessui/react";
import { useState } from "react";
const colors = [
  { id: 1, name: "Black", class: "bg-black" },
  { id: 2, name: "Brown", class: "bg-amber-800" },
  { id: 3, name: "Red", class: "bg-red-600" },
  { id: 4, name: "White", class: "bg-gray-100" },
];
const images = [
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2022/10/02/13/07/autumn-7493439_960_720.jpg",
  },
  {
    id: 2,
    src: "https://cdn.pixabay.com/photo/2024/09/19/18/08/rose-9059411_1280.jpg",
  },
  {
    id: 3,
    src: "https://cdn.pixabay.com/photo/2025/01/09/16/33/playing-cards-9322164_1280.jpg",
  },
];
const tabs = ["Additional Info", "Description", "Reviews"];
const reviews = [
  {
    id: 1,
    author: "Sofia Harvetz",
    avatar:
      "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
    rating: 5,
    date: "3 weeks ago",
    content:
      'I bought it 3 weeks ago and now come back just to say "Awesome Product"! I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque et quasi molestias excepturi sint non provident.',
    likes: 4,
  },
  // More reviews...
];
const SingleProductPage = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [newReview, setNewReview] = useState({
    rating: 0,
    content: "",
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.rating !== 5) {
      alert("Please provide a 5-star rating.");
      return;
    }
    // Add logic to submit the review
    console.log("New Review Submitted:", newReview);
  };

  const filteredReviews = reviews.sort((a, b) => {
    if (filter === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    // Add more sorting logic if needed
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <TabGroup as="div" className="flex flex-col">
          <div className="relative">
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black text-white">
                NEW
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-500 text-white">
                -50%
              </span>
            </div>

            <TabPanels className="  w-full">
              {images.map((image) => (
                <TabPanel key={image.id}>
                  <div className="  relative overflow-hidden rounded-lg">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt="Tray Table"
                      className="object-cover"
                    />
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </div>

          <Tab.List className="grid grid-cols-3 gap-4 mt-4">
            {images.map((image) => (
              <Tab
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg focus:outline-none"
              >
                {({ selected }) => (
                  <>
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt=""
                      className="object-cover"
                    />
                    <span
                      className={`absolute inset-0 ring-2 ring-offset-2 ${
                        selected ? "ring-black" : "ring-transparent"
                      }`}
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
        </TabGroup>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600 ml-2">11 Reviews</span>
            </div>
            <h1 className="text-3xl font-bold">Tray Table</h1>
            <p className="text-gray-600">
              Buy one or buy a few and make every space where you sit more
              convenient. Light and easy to move around with removable tray top.
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold">$199.00</span>
            <span className="text-gray-500 line-through">$400.00</span>
          </div>

          {/* Timer */}
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { value: "02", label: "Days" },
              { value: "12", label: "Hours" },
              { value: "45", label: "Minutes" },
              { value: "05", label: "Seconds" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Measurements</h3>
            <p>17 1/2"×20 5/8"</p>
          </div>

         
          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 items-center">
            <div className="flex border rounded-md">
              <button
                className="px-3 py-1 border-r hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                className="px-3 py-1 border-l hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
              Add to Cart
            </button>
            <button className="p-2 border rounded-md hover:bg-gray-50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Product Metadata */}
          <div className="pt-6 border-t space-y-2 text-sm text-gray-600">
            <div className="flex gap-2">
              <span>SKU:</span>
              <span>1517</span>
            </div>
            <div className="flex gap-2">
              <span>Category:</span>
              <span>Living Room, Bedroom</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <TabGroup>
          <TabList className="flex border-b">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium focus:outline-none ${
                    selected
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="pt-6">
                <h2 className="text-xl font-semibold">
                  Additional Information
                </h2>
                <p className="text-gray-600">
                  Here you can add additional information about the product.
                </p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="pt-6">
                <h2 className="text-xl font-semibold">Questions</h2>
                <p className="text-gray-600">
                  Here you can add frequently asked questions about the product.
                </p>
              </div>
            </TabPanel>
            <TabPanel className="pt-6">
              <div className="space-y-6">
                {/* Reviews Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Customer Reviews</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4 ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">11 Reviews</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="px-4 py-1 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800">
                      Write Review
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">11 Reviews</h3>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-lg border bg-white px-4 py-2"
                  >
                    <option value="newest">Newest</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>

                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.author}
                        width={40}
                        height={40}
                        className="rounded-full w-[50px] h-[50px] object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="flex gap-2 items-center">
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="w-4 h-4 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                        <div className="flex gap-4">
                          <button className="text-sm text-gray-500 hover:text-black">
                            Like
                          </button>
                          <button className="text-sm text-gray-500 hover:text-black">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 text-sm font-medium text-gray-600 border rounded-md hover:bg-gray-50">
                  Load more
                </button>

                {/* Submit Review Form */}
                <div className="pt-6">
                  <h2 className="text-xl font-semibold">Write a Review</h2>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            onClick={() =>
                              setNewReview({ ...newReview, rating: i + 1 })
                            }
                            className={`w-6 h-6 cursor-pointer ${
                              i < newReview.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Review
                      </label>
                      <textarea
                        value={newReview.content}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            content: e.target.value,
                          })
                        }
                        className="mt-3 block w-full resize-none border border-gray-300 rounded-lg   bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        rows={4}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default SingleProductPage;
