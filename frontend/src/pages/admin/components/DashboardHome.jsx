// src/pages/admin/components/DashboardHome.jsx
import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Products",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: "📦",
      color: "bg-blue-500",
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: "🛒",
      color: "bg-green-500",
      link: "/admin/orders",
    },
    {
      title: "Total Users",
      value: "5,678",
      change: "+15%",
      trend: "up",
      icon: "👥",
      color: "bg-purple-500",
      link: "/admin/users",
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+23%",
      trend: "up",
      icon: "💰",
      color: "bg-yellow-500",
      link: "/admin/orders",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New order placed",
      user: "John Doe",
      time: "2 min ago",
      type: "order",
    },
    {
      id: 2,
      action: "Product added",
      user: "Sarah Smith",
      time: "5 min ago",
      type: "product",
    },
    {
      id: 3,
      action: "User registered",
      user: "Mike Johnson",
      time: "10 min ago",
      type: "user",
    },
    {
      id: 4,
      action: "Order shipped",
      user: "Emily Brown",
      time: "15 min ago",
      type: "order",
    },
  ];

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new skincare product",
      icon: "➕",
      link: "/admin/products/new",
      color: "bg-blue-500",
    },
    {
      title: "View Orders",
      description: "Manage customer orders",
      icon: "📋",
      link: "/admin/orders",
      color: "bg-green-500",
    },
    {
      title: "User Management",
      description: "Manage system users",
      icon: "👥",
      link: "/admin/users",
      color: "bg-purple-500",
    },
    {
      title: "Categories",
      description: "Organize product categories",
      icon: "📁",
      link: "/admin/categories",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-gray-300">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-white mt-2">
                  {stat.value}
                </p>
                <div
                  className={`flex items-center mt-2 text-sm ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <span>{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-gray-700/50 hover:bg-gray-600 rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-yellow-500/30"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-xs">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "order"
                      ? "bg-blue-500/20"
                      : activity.type === "product"
                      ? "bg-green-500/20"
                      : "bg-purple-500/20"
                  }`}
                >
                  <span className="text-lg">
                    {activity.type === "order"
                      ? "🛒"
                      : activity.type === "product"
                      ? "📦"
                      : "👤"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    {activity.action}
                  </p>
                  <p className="text-gray-400 text-xs">by {activity.user}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/30 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-sm font-medium">Online</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white font-semibold mt-2">Server Status</p>
            <p className="text-gray-400 text-xs">All systems operational</p>
          </div>
          <div className="bg-gray-700/30 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm font-medium">Fast</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-white font-semibold mt-2">Performance</p>
            <p className="text-gray-400 text-xs">Response time: 120ms</p>
          </div>
          <div className="bg-gray-700/30 rounded-xl p-4 border border-yellow-500/20">
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 text-sm font-medium">
                Secure
              </span>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-white font-semibold mt-2">Security</p>
            <p className="text-gray-400 text-xs">All checks passed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
