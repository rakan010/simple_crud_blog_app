import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoPencil, IoSave, IoClose } from "react-icons/io5";
import axios from "axios";
import LoadingSpinner from "./common/LoadingSpinner";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(response.data);
      setEditedPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        editedPost
      );
      setPost(editedPost);
      setEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto max-w-4xl container-padding">
      <div className="content-spacing">
        {editing ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm mx-4">
            <div className="card-padding">
              <div className="content-spacing">
                <input
                  type="text"
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, title: e.target.value })
                  }
                  className="input-padding w-full text-lg text-gray-100 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  placeholder="Post title"
                />
                <textarea
                  value={editedPost.body}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, body: e.target.value })
                  }
                  className="input-padding w-full text-lg text-gray-100 bg-gray-900/50 border border-gray-700 rounded-xl h-48 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
                  placeholder="Post content"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleUpdate}
                    className="button-padding bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-200 flex items-center gap-2"
                  >
                    <IoSave className="text-xl" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="button-padding bg-gray-700 text-gray-100 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
                  >
                    <IoClose className="text-xl" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm mx-4">
            <div className="card-padding">
              <div className="content-spacing">
                <h1 className="text-3xl font-bold text-gray-100">
                  {post.title}
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {post.body}
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="button-padding bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-200 flex items-center gap-2"
                >
                  <IoPencil className="text-xl" />
                  Edit Post
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm mx-4">
          <div className="card-padding">
            <div className="content-spacing">
              <h2 className="text-2xl font-bold text-gray-100">Comments</h2>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-700 pb-6 last:border-0"
                  >
                    <div className="content-spacing">
                      <h3 className="font-medium text-gray-200 text-lg">
                        {comment.name}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {comment.body}
                      </p>
                      <p className="text-sm text-sky-400">{comment.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
