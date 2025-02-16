import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import axios from "axios";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", body: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", post);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl container-padding">
      <div className="content-spacing">
        <h1 className="header-spacing text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          Create New Post
        </h1>
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm mx-4">
          <div className="card-padding">
            <form onSubmit={handleSubmit} className="content-spacing">
              <div>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="input-padding w-full text-lg text-gray-100 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  placeholder="Enter post title..."
                  required
                />
              </div>
              <div>
                <textarea
                  value={post.body}
                  onChange={(e) => setPost({ ...post, body: e.target.value })}
                  className="input-padding w-full text-lg text-gray-100 bg-gray-900/50 border border-gray-700 rounded-xl h-48 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
                  placeholder="Enter post content..."
                  required
                />
              </div>
              <button
                type="submit"
                className="button-padding w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <IoAdd className="text-2xl" />
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
