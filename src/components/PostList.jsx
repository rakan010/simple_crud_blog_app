import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoChevronForward,
  IoTrashOutline,
  IoChevronBack,
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "react-icons/io5";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 5;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const allPosts = response.data;
      setTotalPages(Math.ceil(allPosts.length / postsPerPage));

      // Get current posts
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

      setPosts(currentPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-800 bg-clip-text text-transparent py-4">
        All Posts
      </h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-12"
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-2">{post.body}</p>
              <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-100">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-sky-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  View Details
                  <IoChevronForward className="text-lg" />
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
                >
                  <IoTrashOutline className="text-lg" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg flex items-center justify-center ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-sky-600 hover:bg-sky-50"
          }`}
        >
          <IoChevronBackOutline className="text-xl" />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          // Show only current page, first, last, and 1 page before and after current
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                  currentPage === pageNumber
                    ? "bg-sky-600 text-white"
                    : "text-gray-600 hover:bg-sky-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return (
              <span
                key={pageNumber}
                className="w-10 h-10 flex items-center justify-center text-gray-400"
              >
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg flex items-center justify-center ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-sky-600 hover:bg-sky-50"
          }`}
        >
          <IoChevronForwardOutline className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default PostList;
