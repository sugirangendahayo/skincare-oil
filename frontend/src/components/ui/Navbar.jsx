import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/50' 
          : 'bg-gradient-to-br from-pink-50/60 via-white/80 to-purple-50/60 backdrop-blur-3xl shadow-xl border-b border-white/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20 relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 hover:rotate-1 transition-all duration-300 group"
            >
              Hair<span className="text-rose-400 group-hover:text-rose-500">iat</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
            {[
              { to: '/', label: 'Home' },
         
              { to: '/categories', label: 'Categories' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-rose-500 transition-all duration-300 group rounded-full overflow-hidden"
              >
                {item.label}
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-purple-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop Right Icons/Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Search Button */}
            <button className="p-2.5 rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-rose-500 hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart with Badge */}
            <Link to="/cart" className="relative p-2.5 rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-rose-500 hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M16 13a1.5 1.5 0 01-3 0m0 0a1.5 1.5 0 00-3 0m0 0V9a1.5 1.5 0 013 0v4z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-2xl w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">3</span>
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400/20 to-purple-400/20 backdrop-blur-sm border border-white/30 hover:border-rose-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-9 h-9 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-semibold text-gray-700 group-hover:text-rose-500">Hi, {user.username?.split(' ')[0]}</span>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/30 overflow-hidden">
                  <Link to="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors">Profile</Link>
                  <Link to="/orders" className="block px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors">Orders</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-rose-500 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
              className="p-2.5 rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-rose-500 hover:rotate-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden overflow-hidden bg-white/95 backdrop-blur-2xl border-t border-white/50 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Shop' },
              { to: '/categories', label: 'Categories' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-3 py-4 text-base font-semibold text-gray-700 hover:text-rose-500 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 rounded-2xl mx-2 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 bg-gradient-to-b from-transparent to-white/50">
            <div className="flex items-center px-5 space-x-4">
              <Link to="/cart" className="p-3 rounded-2xl bg-white/50 hover:bg-white/80 shadow-lg transition-all" onClick={() => setIsOpen(false)}>
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M16 13a1.5 1.5 0 01-3 0m0 0a1.5 1.5 0 00-3 0m0 0V9a1.5 1.5 0 013 0v4z" />
                </svg>
              </Link>
              {user ? (
                <>
                  <div className="flex-1 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-semibold text-gray-700">Hi, {user.username?.split(' ')[0]}</span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-2 ml-auto">
                  <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/signup" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={() => setIsOpen(false)}>
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