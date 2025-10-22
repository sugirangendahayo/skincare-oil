// src/pages/Categories.jsx - Categories page component with tabs
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

const API_BASE_URL = "http://localhost:3000";

const Categories = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  const categoryImages = {
    "Traditional Dresses":
      "https://www.shutterstock.com/image-photo/beautiful-african-bride-traditional-attire-260nw-2124125702.jpg",
    "Wedding Gowns":
      "https://www.shutterstock.com/image-photo/beautiful-bride-wedding-dress-posing-260nw-1823277650.jpg",
    "Men's Suits":
      "https://www.shutterstock.com/image-photo/elegant-groom-suit-posing-wedding-day-260nw-2140349651.jpg",
    "Bridesmaid Dresses":
      "https://www.shutterstock.com/image-photo/bridesmaids-holding-bouquets-standing-together-260nw-1082110022.jpg",
  };
  

  useEffect(() => {
    // In src/pages/Categories.jsx, modify the fetchData function
    async function fetchData() {
      try {
        const catRes = await axios.get(`${API_BASE_URL}/api/categories`);
        const prodRes = await axios.get(`${API_BASE_URL}/api/products`);

        const products = prodRes.data.map((product) => ({
          ...product,
          // Convert price to a number immediately after fetching
          price: Number(product.price),
        }));

        const processedCategories = catRes.data.map((category) => ({
          ...category,
          image:
            categoryImages[category.name] ||
            "https://www.shutterstock.com/image-photo/bridesmaids-holding-bouquets-standing-together-260nw-1082110022.jpg",
          products: products.filter(
            (product) => product.category_id === category.id
          ),
        }));

        setCategoriesWithProducts(processedCategories);

        if (processedCategories.length > 0) {
          setActiveTab(processedCategories[0].id);
          setActiveCategory(processedCategories[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Handle tab click
  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    const category = categoriesWithProducts.find(
      (cat) => cat.id === categoryId
    );
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Explore Our <span className="text-rose-500">Collections</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Discover premium skincare solutions tailored for every skin type.
            From deep hydration to anti-aging formulas, find your perfect match.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoriesWithProducts.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabClick(category.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 border-2 ${
                activeTab === category.id
                  ? "bg-rose-500 text-black border-rose-500 shadow-2xl shadow-rose-500/25"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-rose-500 hover:text-rose-400 hover:bg-rose-500/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        {activeCategory && (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            {/* Category Header */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={activeCategory.image}
                alt={activeCategory.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {activeCategory.name}
                    </h2>
                    <p className="text-rose-400 text-lg">
                      {activeCategory.products.length} premium product
                      {activeCategory.products.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="bg-rose-500/20 backdrop-blur-sm border border-rose-500/30 rounded-2xl px-4 py-2">
                    <span className="text-rose-400 font-bold text-sm">
                      EXCLUSIVE COLLECTION
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="p-8">
              {activeCategory.products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeCategory.products.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:border-rose-500/50 border border-gray-700 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="flex flex-col h-full">
                        {/* Product Image */}
                        <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-gray-700 to-gray-800">
                          <img
                            src={`${API_BASE_URL}${product.image_url}`}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 bg-rose-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>

                          {/* Features */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-rose-500/10 text-rose-400 px-2 py-1 rounded text-xs font-medium">
                              Premium
                            </span>
                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-medium">
                              Natural
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto pt-4 border-t border-gray-700">
                          <div className="flex gap-3">
                            <button
                              onClick={() => addToCart(product)}
                              className="flex-1 bg-rose-500 text-black font-bold py-3 px-4 rounded-xl hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                              Add to Cart
                            </button>
                            <Link
                              to={`/product/${product.id}`}
                              className="flex items-center justify-center w-12 bg-gray-700 text-gray-300 rounded-xl hover:bg-rose-500 hover:text-black transition-all duration-300 transform hover:scale-105"
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-rose-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Coming Soon
                  </h3>
                  <p className="text-gray-400 text-lg mb-6">
                    We're preparing something amazing for this category!
                  </p>
                  <button className="bg-rose-500 text-black font-bold py-3 px-6 rounded-xl hover:bg-rose-600 transition-all duration-300">
                    Notify Me
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Categories Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            All <span className="text-rose-500">Categories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesWithProducts.map((category) => (
              <div
                key={category.id}
                className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleTabClick(category.id)}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-500/20 transition-colors">
                    <span className="text-2xl">{category.icon || "✨"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {category.products.length} products
                  </p>
                  <div className="w-12 h-1 bg-rose-500 rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
