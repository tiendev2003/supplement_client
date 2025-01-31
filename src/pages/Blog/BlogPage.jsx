import { Grid, List } from "lucide-react";
import { useState } from "react";
import BlogGrid from "../../components/blog/BlogGrid";
import SortDropdown from "../../components/blog/SortDropdown";

const blogPosts = [
  {
    id: 1,
    title: "7 ways to decor your home like a professional",
    date: "October 15, 2023",
    image: "/placeholder.svg",
    category: "featured",
  },
  {
    id: 2,
    title: "Inside a beautiful kitchen organization",
    date: "October 14, 2023",
    image: "/placeholder.svg",
    category: "featured",
  },
  {
    id: 3,
    title: "Decor your bedroom for your children",
    date: "October 13, 2023",
    image: "/placeholder.svg",
    category: "regular",
  },
  {
    id: 4,
    title: "Modern texas home is beautiful and completely kid-friendly",
    date: "October 12, 2023",
    image: "/placeholder.svg",
    category: "regular",
  },
  {
    id: 5,
    title: "Modern texas home is beautiful and completely kid-friendly",
    date: "October 11, 2023",
    image: "/placeholder.svg",
    category: "regular",
  },
  {
    id: 6,
    title: "Modern texas home is beautiful and completely kid-friendly",
    date: "October 10, 2023",
    image: "/placeholder.svg",
    category: "featured",
  },
  {
    id: 7,
    title: "Modern texas home is beautiful and completely kid-friendly",
    date: "October 9, 2023",
    image: "/placeholder.svg",
    category: "regular",
  },
  {
    id: 8,
    title: "Modern texas home is beautiful and completely kid-friendly",
    date: "October 8, 2023",
    image: "/placeholder.svg",
    category: "regular",
  },
  {
    id: 9,
    title: "Modern texas home is beautiful and completely kid-friendly",
    date: "October 7, 2023",
    image: "/placeholder.svg",
    category: "regular",
  },
];
const BlogPage = () => {
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");

  const sortPosts = (posts) => {
    return [...posts].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });
  };

  const filteredPosts =
    activeTab === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Custom Tabs */}
          <div className="inline-flex rounded-lg border bg-white p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors
                ${
                  activeTab === "all"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
            >
              All Blog
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors
                ${
                  activeTab === "featured"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Featured
            </button>
          </div>

          <div className="flex items-center gap-4">
            <SortDropdown value={sortBy} onChange={setSortBy} />

            <div className="flex rounded-lg border bg-white">
              <button
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${
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
                className={`p-2 transition-colors ${
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

        <BlogGrid posts={sortPosts(filteredPosts)} view={view} />
      </div>
    </div>
  );
};

export default BlogPage;
