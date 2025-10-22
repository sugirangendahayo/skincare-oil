// src/pages/admin/components/UsersManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userData = { ...formData };
    if (!editingUser) {
      // For add, include password
    } else {
      // For edit, remove password if empty
      if (!userData.password) delete userData.password;
    }

    try {
      if (editingUser) {
        await axios.put(`${API_BASE_URL}/api/users/${editingUser}`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/users`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_BASE_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  function startEdit(user) {
    setEditingUser(user.id);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowForm(true);
  }

  function resetForm() {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "user",
    });
    setShowForm(false);
    setEditingUser(null);
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Users Management</h1>
        <button
          className="bg-rose-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-rose-600 transition-colors"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add New User
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingUser ? "Edit User" : "Add New User"}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="bg-gray-800 text-white p-2 rounded w-full mb-4"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-800 text-white p-2 rounded w-full mb-4"
              required
            />
            <input
              type="password"
              name="password"
              placeholder={editingUser ? "New Password (optional)" : "Password"}
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-800 text-white p-2 rounded w-full mb-4"
              required={!editingUser}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="bg-gray-800 text-white p-2 rounded w-full mb-4"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-rose-500 text-black py-2 px-4 rounded"
              >
                {editingUser ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4">ID</th>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <button
                    onClick={() => startEdit(user)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="bg-gray-700/30 rounded-xl p-8 text-center border-2 border-dashed border-gray-600 mt-4">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-white text-lg font-semibold mb-2">
              No Users Yet
            </h3>
            <p className="text-gray-400">
              Manage system users and permissions here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
