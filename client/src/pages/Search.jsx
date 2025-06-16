import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { debounce } from "lodash";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchParams) => {
      const urlParams = new URLSearchParams(searchParams);
      navigate(`/search?${urlParams.toString()}`);
    }, 500),
    []
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
          setShowMore(data.posts.length === 9);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevState) => {
      const newState = {
        ...prevState,
        [id]: value,
      };

      // Create search params
      const searchParams = new URLSearchParams();
      if (newState.searchTerm)
        searchParams.set("searchTerm", newState.searchTerm);
      if (newState.sort) searchParams.set("sort", newState.sort);
      if (newState.category && newState.category !== "uncategorized") {
        searchParams.set("category", newState.category);
      }

      // If it's the search term, use debounced search
      if (id === "searchTerm") {
        debouncedSearch(searchParams);
      } else {
        // For other filters, update immediately
        navigate(`/search?${searchParams.toString()}`);
      }

      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (sidebarData.searchTerm)
      urlParams.set("searchTerm", sidebarData.searchTerm);
    if (sidebarData.sort) urlParams.set("sort", sidebarData.sort);
    if (sidebarData.category && sidebarData.category !== "uncategorized") {
      urlParams.set("category", sidebarData.category);
    }
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        throw new Error("Failed to fetch more posts");
      }
      const data = await res.json();
      if (Array.isArray(data.posts)) {
        setPosts([...posts, ...data.posts]);
        setShowMore(data.posts.length === 9);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Search & Filter
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Term
                  </label>
                  <TextInput
                    placeholder="Search posts..."
                    id="searchTerm"
                    type="text"
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.sort}
                    id="sort"
                    className="w-full"
                  >
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.category}
                    id="category"
                    className="w-full"
                  >
                    <option value="uncategorized">All Categories</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React.js</option>
                    <option value="nextjs">Next.js</option>
                  </Select>
                </div>
                <Button
                  type="submit"
                  gradientDuoTone="purpleToPink"
                  className="w-full hover:scale-105 transition-transform duration-200"
                >
                  Apply Filters
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Search Results
              </h1>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Spinner size="xl" color="purple" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                    No posts found
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter to find what you&apos;re
                    looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              )}

              {showMore && (
                <div className="mt-8 text-center">
                  <Button
                    gradientDuoTone="purpleToPink"
                    onClick={handleShowMore}
                    className="inline-flex items-center hover:scale-105 transition-transform duration-200"
                  >
                    Show More
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
