// src/pages/Categories.jsx - Categories page component with tabs
import React, { useEffect, useState } from 'react';
import data from "../../data/data.json";

const Categories = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // "Fetch" and process hardcoded data
    const processedCategories = data.categories.map(category => ({
      ...category,
      products: data.products.filter(product => product.category_id === category.id)
    }));
    setCategoriesWithProducts(processedCategories);
    
    // Set first category as active by default
    if (processedCategories.length > 0) {
      setActiveTab(processedCategories[0].id);
      setActiveCategory(processedCategories[0]);
    }
  }, []);

  // Handle tab click
  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    const category = categoriesWithProducts.find(cat => cat.id === categoryId);
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 font-quicksand pt-16 mt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-purple-800 tracking-wide">
          Explore Our Skincare Categories
        </h1>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categoriesWithProducts.map(category => (
            <button
              key={category.id}
              onClick={() => handleTabClick(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === category.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        {activeCategory && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Category Header */}
            <div className="relative">
              <img 
                src={activeCategory.image} 
                alt={activeCategory.name} 
                className="w-full h-64 object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {activeCategory.name}
                </h2>
                <p className="text-purple-200 text-lg">
                  {activeCategory.products.length} product{activeCategory.products.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="p-6">
              {activeCategory.products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCategory.products.map(product => (
                    <div 
                      key={product.id} 
                      className="bg-gray-50 rounded-xl p-4 hover:bg-purple-50 transition-all duration-300 hover:shadow-lg border border-gray-100"
                    >
                      <div className="flex flex-col h-full">
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                        />
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="mt-auto pt-3 border-t border-gray-200">
                          <p className="text-purple-600 font-bold text-lg">${product.price.toFixed(2)}</p>
                          <button className="w-full mt-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-black transition-colors duration-300 font-semibold">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">😔</div>
                  <p className="text-xl text-gray-500">No products in this category yet.</p>
                  <p className="text-gray-400">Check back soon for new arrivals!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Categories View (Optional - can be removed if you only want tabs) */}
        {!activeTab && categoriesWithProducts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Select a category above to view products</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;