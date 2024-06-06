import { Link, useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi"; // Importing an icon from react-icons
import useAuthStore from "../stores/authStore";
import toast from "react-hot-toast";
import { logoutUser } from "../utils/apiAuthClient";

export const Navbar = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    logoutUser();
    toast.success("You have successfully logged out.");
    navigate("/"); //back to landing
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="public/images/logo/icons8-books-100.png"
                alt="BookVerse Logo"
                className="h-8 w-auto"
              />
            </Link>
            <Link to="/" className="ml-3 text-lg font-bold text-teal-600">
              BookVerse
            </Link>
          </div>

          <div className="flex space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <HiUserCircle className="text-violet-400 mr-1" size={20} />
                  Hi, {user.username}!
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-amber-400 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/register"
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
