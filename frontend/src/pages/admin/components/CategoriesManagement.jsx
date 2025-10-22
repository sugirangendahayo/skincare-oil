// src/pages/admin/components/CategoriesManagement.jsx
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchCategoryDetails(id) {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories/${id}`);
      setFormData({
        name: res.data.name,
        image_url: res.data.image_url,
      });
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => setImageFiles(acceptedFiles),
  });

  async function uploadImage(files) {
    if (files.length === 0) return "";
    const formData = new FormData();
    formData.append("images", files[0]);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/products/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.urls[0];
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let image_url = formData.image_url;
    if (imageFiles.length > 0) {
      const uploaded = await uploadImage(imageFiles);
      if (uploaded) image_url = uploaded;
    }

    const categoryData = { ...formData, image_url };
    const token = localStorage.getItem("token");

    try {
      if (editingCategory) {
        await axios.put(
          `${API_BASE_URL}/api/categories/${editingCategory}`,
          categoryData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/api/categories`, categoryData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_BASE_URL}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  function startEdit(id) {
    setEditingCategory(id);
    fetchCategoryDetails(id);
    setShowForm(true);
    setImageFiles([]);
  }

  function resetForm() {
    setFormData({
      name: "",
      image_url: "",
    });
    setImageFiles([]);
    setShowForm(false);
    setEditingCategory(null);
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Categories Management</h1>
        <button
          className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add New Category
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-800 text-white p-2 rounded w-full mb-4"
              required
            />
            <div className="mt-4">
              <h3 className="text-white mb-2">Category Image</h3>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-600 p-4 rounded cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="text-gray-400">
                  Drop image here or click to select
                </p>
              </div>
              {imageFiles.length > 0 && (
                <p className="text-white mt-2">{imageFiles[0].name}</p>
              )}
              {formData.image_url && !imageFiles.length && (
                <p className="text-gray-400 mt-2">
                  Current: {formData.image_url}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-black py-2 px-4 rounded"
              >
                {editingCategory ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4">Name</th>
             
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-700">
                <td className="p-4">{category.name}</td>
               
                <td className="p-4">
                  <button
                    onClick={() => startEdit(category.id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <div className="bg-gray-700/30 rounded-xl p-8 text-center border-2 border-dashed border-gray-600 mt-4">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-white text-lg font-semibold mb-2">
              No Categories Yet
            </h3>
            <p className="text-gray-400">Add categories here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesManagement;
