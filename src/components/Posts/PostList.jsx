import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import Pagination from "../Pagination/Pagination";
import { usePosts } from "../../hooks/usePosts";
import LoadingSpinner from "../common/LoadingSpinner";

function PostList() {
  const {
    posts,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    deletePost,
  } = usePosts();

  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl container-padding">
      <div className="content-spacing">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent header-spacing post-title-spacing">
          All Posts
        </h1>
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={deletePost} />
          ))}
        </div>
        <div className="pagination-spacing">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PostList;
