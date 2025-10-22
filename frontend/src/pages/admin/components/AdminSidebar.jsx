// src/pages/admin/components/AdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/admin/products",
      icon: (
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      label: "Products",
    },
    {
      path: "/admin/categories",
      icon: (
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      label: "Categories",
    },
    {
      path: "/admin/orders",
      icon: (
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      label: "Orders",
    },
    {
      path: "/admin/users",
      icon: (
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      label: "Users",
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-gray-900 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        {isOpen && (
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
              Hairiat Admin
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
        >
          <svg
            className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
              isActive(item.path, item.exact)
                ? "bg-rose-500 text-black shadow-lg shadow-rose-500/25"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            } ${!isOpen ? "justify-center" : ""}`}
          >
            <span
              className={`${
                isActive(item.path, item.exact)
                  ? "text-black"
                  : "text-rose-400"
              } transition-colors duration-200`}
            >
              {item.icon}
            </span>
            {isOpen && (
              <span className="ml-3 transition-all duration-200">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 ${
          !isOpen ? "text-center" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                A
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
