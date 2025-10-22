// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import DashboardHome from "./components/DashboardHome";
import ProductsManagement from "./components/ProductsManagement";
import CategoriesManagement from "./components/CategoriesManagement";
import UsersManagement from "./components/UsersManagement";
import OrdersManagement from "./components/OrdersManagement";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get current page title from pathname
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/admin/products")) return "Products Management";
    if (path.includes("/admin/categories")) return "Categories Management";
    if (path.includes("/admin/users")) return "Users Management";
    if (path.includes("/admin/orders")) return "Orders Management";
    return "Dashboard Overview";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Header */}
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          pageTitle={getPageTitle()}
          userName={user.username}
        />

        {/* Main Content Area */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/categories" element={<CategoriesManagement />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
