import { Link } from "react-router-dom";
import { IoChevronForward, IoTrashOutline } from "react-icons/io5";

function PostCard({ post, onDelete }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm hover:shadow-md hover:shadow-sky-500/5 transition-all duration-200 mx-4 post-item-spacing">
      <div className="card-padding">
        <div className="content-spacing">
          <h2 className="text-3xl font-bold text-gray-100">{post.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed line-clamp-3">
            {post.body}
          </p>
          <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-700">
            <Link
              to={`/posts/${post.id}`}
              className="button-padding bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-200 flex items-center gap-2"
            >
              View Details
              <IoChevronForward className="text-xl" />
            </Link>
            <button
              onClick={() => onDelete(post.id)}
              className="button-padding bg-gray-700 text-gray-100 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
            >
              <IoTrashOutline className="text-xl" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
