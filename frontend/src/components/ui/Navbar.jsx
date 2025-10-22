import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useCartStore from "../../store/cartStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cartQuantity = useCartStore((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    // Check for logged-in user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl shadow-2xl border-b border-yellow-500/20"
          : "bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-3xl shadow-xl border-b border-yellow-500/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20 relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to={user?.role === "admin" ? "/admin" : "/"}
              className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 group"
            >
              Hair
              <span className="text-yellow-400 group-hover:text-yellow-300">
                iat
              </span>
              {user?.role === "admin" && (
                <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">
                  ADMIN
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
            {user?.role === "admin" ? (
              // Admin Navigation
              <>
                <Link
                  to="/admin"
                  className="relative px-4 py-2 text-sm font-semibold text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/10 transition-all duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/products"
                  className="relative px-4 py-2 text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-all duration-300 group rounded-full overflow-hidden"
                >
                  Products
                </Link>
                <Link
                  to="/admin/orders"
                  className="relative px-4 py-2 text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-all duration-300 group rounded-full overflow-hidden"
                >
                  Orders
                </Link>
              </>
            ) : (
              // Regular User Navigation
              [
                { to: "/", label: "Home" },
               
                { to: "/categories", label: "Categories" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-all duration-300 group rounded-full overflow-hidden"
                >
                  {item.label}
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-300" />
                </Link>
              ))
            )}
          </div>

          {/* Desktop Right Icons/Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Search Button */}
            {user?.role !== "admin" && (
              <button className="p-2.5 rounded-xl bg-gray-800/50 hover:bg-yellow-500/20 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 text-gray-300 hover:text-yellow-400 hover:scale-110">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}

            {/* Cart with Badge - Only for regular users */}
            {user?.role !== "admin" && (
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl bg-gray-800/50 hover:bg-yellow-500/20 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 text-gray-300 hover:text-yellow-400 hover:scale-110"
              >
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M16 13a1.5 1.5 0 01-3 0m0 0a1.5 1.5 0 00-3 0m0 0V9a1.5 1.5 0 013 0v4z"
                  />
                </svg>
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs rounded-2xl w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartQuantity}
                  </span>
                )}
              </Link>
            )}

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={handleProfileToggle}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-400/50 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
                >
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg ${
                      user.role === "admin"
                        ? "bg-red-500 text-white"
                        : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                    }`}
                  >
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="text-left">
                    <span className="hidden lg:block text-sm font-semibold text-yellow-400">
                      {user.username?.split(" ")[0]}
                    </span>
                    <span className="hidden lg:block text-xs text-yellow-500/70">
                      {user.role === "admin" ? "Administrator" : "Customer"}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-yellow-400 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-yellow-500/10 border border-yellow-500/20 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-yellow-500/10">
                      <p className="text-sm font-medium text-white">
                        {user.username}
                      </p>
                      <p className="text-xs text-yellow-400">{user.email}</p>
                      <p className="text-xs text-gray-400 capitalize">
                        {user.role}
                      </p>
                    </div>

                    {user.role === "admin" ? (
                      <>
                        <Link
                          to="/admin"
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-b border-yellow-500/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/admin/profile"
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-b border-yellow-500/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Admin Settings
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-b border-yellow-500/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-b border-yellow-500/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-b border-yellow-500/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Wishlist
                        </Link>
                      </>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-yellow-400 bg-gray-800/50 hover:bg-yellow-500/10 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-yellow-500/30 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl border border-yellow-500 shadow-lg hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300 font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-gray-800/50 hover:bg-yellow-500/20 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 text-gray-300 hover:text-yellow-400 hover:rotate-90"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user?.role === "admin" ? (
              // Admin Mobile Navigation
              <>
                <Link
                  to="/admin"
                  className="block px-3 py-4 text-base font-semibold text-yellow-400 bg-yellow-500/10 rounded-2xl mx-2 border border-yellow-500/30"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/products"
                  className="block px-3 py-4 text-base font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-yellow-600/5 rounded-2xl mx-2 transition-all duration-300 border border-transparent hover:border-yellow-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/admin/orders"
                  className="block px-3 py-4 text-base font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-yellow-600/5 rounded-2xl mx-2 transition-all duration-300 border border-transparent hover:border-yellow-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
              </>
            ) : (
              // Regular User Mobile Navigation
              [
                { to: "/", label: "Home" },
                
                { to: "/categories", label: "Categories" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-4 text-base font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-yellow-600/5 rounded-2xl mx-2 transition-all duration-300 border border-transparent hover:border-yellow-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>

          {/* Mobile User Section */}
          <div className="pt-4 pb-4 border-t border-yellow-500/20 bg-gradient-to-b from-transparent to-yellow-500/5">
            <div className="flex items-center px-5 space-x-4">
              {user?.role !== "admin" && (
                <Link
                  to="/cart"
                  className="p-3 rounded-2xl bg-gray-800/50 hover:bg-yellow-500/20 border border-gray-700 hover:border-yellow-500/50 shadow-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-6 h-6 text-gray-300 hover:text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M16 13a1.5 1.5 0 01-3 0m0 0a1.5 1.5 0 00-3 0m0 0V9a1.5 1.5 0 013 0v4z"
                    />
                  </svg>
                </Link>
              )}

              {user ? (
                <>
                  <div className="flex-1 flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg ${
                        user.role === "admin"
                          ? "bg-red-500 text-white"
                          : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                      }`}
                    >
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-400">
                        {user.username?.split(" ")[0]}
                      </p>
                      <p className="text-xs text-yellow-500/70 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl border border-yellow-500 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 font-bold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-2 ml-auto">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-800/80 rounded-xl border border-gray-700 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 hover:text-yellow-400 hover:border-yellow-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl border border-yellow-500 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
