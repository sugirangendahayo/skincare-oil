/* eslint-disable no-unused-vars */
// src/pages/admin/components/ProductsManagement.jsx
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category_id: "",
    stock_quantity: 0,
    image_url: "",
    additional_images: [],
  });
  const [variants, setVariants] = useState([]);
  const [mainImageFiles, setMainImageFiles] = useState([]);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function fetchCategories() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      // console.log(res.data);
      const data = res.data;
      setCategories(data);
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, category_id: data[0].id }));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchProductDetails(id) {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
      const data = res.data;
      console.log(data);
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        stock_quantity: data.stock_quantity,
        image_url: data.image_url,
        additional_images: data.additional_images,
      });
      setVariants(data.variants || []);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { variant_name: "", price_modifier: 0, stock_quantity: 0 },
    ]);
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps: mainDropzoneProps, getInputProps: mainInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      onDrop: (acceptedFiles) => setMainImageFiles(acceptedFiles),
    });

  const {
    getRootProps: additionalDropzoneProps,
    getInputProps: additionalInputProps,
  } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) =>
      setAdditionalImageFiles((prev) => [...prev, ...acceptedFiles]),
  });

  async function uploadImages(files) {
    if (files.length === 0) return [];
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/products/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.urls;
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }
    let image_url = formData.image_url;
    let additional_images = formData.additional_images;

    if (mainImageFiles.length > 0) {
      const uploaded = await uploadImages(mainImageFiles);
      if (uploaded.length > 0) image_url = uploaded[0];
    }

    if (additionalImageFiles.length > 0) {
      const uploaded = await uploadImages(additionalImageFiles);
      additional_images = [...additional_images, ...uploaded];
    }

    const productData = {
      ...formData,
      image_url,
      additional_images,
    };

    try {
      let productId;
      if (editingProduct) {
        const res = await axios.put(
          `${API_BASE_URL}/api/products/${editingProduct}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        productId = editingProduct;
        // Update variants
        for (const variant of variants) {
          if (variant.id) {
            await axios.put(
              `${API_BASE_URL}/api/products/variants/${variant.id}`,
              variant,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            await axios.post(
              `${API_BASE_URL}/api/products/${productId}/variants`,
              variant,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        }
      } else {
        const res = await axios.post(
          `${API_BASE_URL}/api/products`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newProduct = res.data;
        productId = newProduct.id;
        // Add variants
        for (const variant of variants) {
          await axios.post(
            `${API_BASE_URL}/api/products/${productId}/variants`,
            variant,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  function startEdit(id) {
    setEditingProduct(id);
    fetchProductDetails(id);
    setShowForm(true);
    setMainImageFiles([]);
    setAdditionalImageFiles([]);
  }

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category_id: categories[0]?.id || "",
      stock_quantity: 0,
      image_url: "",
      additional_images: [],
    });
    setVariants([]);
    setMainImageFiles([]);
    setAdditionalImageFiles([]);
    setShowForm(false);
    setEditingProduct(null);
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Products Management</h1>
        <button
          className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add New Product
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-2 rounded"
                required
              />
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-2 rounded"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="stock_quantity"
                placeholder="Stock Quantity"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-2 rounded"
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-gray-800 text-white p-2 rounded w-full mt-4"
              rows={4}
              required
            />

            <div className="mt-4">
              <h3 className="text-white mb-2">Main Image</h3>
              <div
                {...mainDropzoneProps()}
                className="border-2 border-dashed border-gray-600 p-4 rounded cursor-pointer"
              >
                <input {...mainInputProps()} />
                <p className="text-gray-400">
                  Drop main image here or click to select
                </p>
              </div>
              {mainImageFiles.length > 0 && (
                <p className="text-white mt-2">{mainImageFiles[0].name}</p>
              )}
              {formData.image_url && !mainImageFiles.length && (
                <p className="text-gray-400 mt-2">
                  Current: {formData.image_url}
                </p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-white mb-2">Additional Images</h3>
              <div
                {...additionalDropzoneProps()}
                className="border-2 border-dashed border-gray-600 p-4 rounded cursor-pointer"
              >
                <input {...additionalInputProps()} />
                <p className="text-gray-400">
                  Drop additional images here or click to select
                </p>
              </div>
              {additionalImageFiles.map((file, i) => (
                <p key={i} className="text-white mt-2">
                  {file.name}
                </p>
              ))}
              {formData.additional_images.length > 0 && (
                <div className="text-gray-400 mt-2">
                  Current: {formData.additional_images.join(", ")}
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-white mb-2">Variants</h3>
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2"
                >
                  <input
                    type="text"
                    name="variant_name"
                    placeholder="Variant Name"
                    value={variant.variant_name}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="bg-gray-800 text-white p-2 rounded"
                  />
                  <input
                    type="number"
                    name="price_modifier"
                    placeholder="Price Modifier"
                    value={variant.price_modifier}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="bg-gray-800 text-white p-2 rounded"
                  />
                  <input
                    type="number"
                    name="stock_quantity"
                    placeholder="Stock Quantity"
                    value={variant.stock_quantity}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="bg-gray-800 text-white p-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addVariant}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
              >
                Add Variant
              </button>
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
                {editingProduct ? "Update" : "Create"}
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
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-700">
                <td className="p-4">{product.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.stock_quantity}</td>
                <td className="p-4">
                  <button
                    onClick={() => startEdit(product.id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="bg-gray-700/30 rounded-xl p-8 text-center border-2 border-dashed border-gray-600 mt-4">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-white text-lg font-semibold mb-2">
              No Products Yet
            </h3>
            <p className="text-gray-400">Add your skincare products here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;
