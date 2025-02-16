import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

function Navbar() {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl app-padding">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent"
          >
            Nakar Arnan Blog Post
          </Link>
          <Link
            to="/create"
            className="button-padding bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-200 flex items-center gap-2"
          >
            <IoAdd className="text-xl" />
            New Post
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
