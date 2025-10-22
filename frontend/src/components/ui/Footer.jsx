// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Collections", path: "/collections" },
    { name: "Designers", path: "/designers" },
    { name: "Accessories", path: "/accessories" },
    { name: "Bridal Suite", path: "/bridal-suite" },
    { name: "Appointments", path: "/appointments" },
  ];

  const services = [
    "Personal Styling",
    "Custom Alterations",
    "Bridal Consultation",
    "Accessory Fitting",
    "Preservation Services",
  ];

  const contactInfo = [
    {
      icon: "📍",
      text: "123 Bridal Avenue\nNew York, NY 10001",
    },
    {
      icon: "📞",
      text: "+1 (555) ELÉGANTE\n+1 (555) 353-4268",
    },
    {
      icon: "✉️",
      text: "hello@elegante.com\nappointments@elegante.com",
    },
    {
      icon: "🕒",
      text: "Mon-Sat: 9AM-6PM\nSun: By Appointment Only",
    },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "📸", url: "#" },
    { name: "Pinterest", icon: "📌", url: "#" },
    { name: "Facebook", icon: "👥", url: "#" },
    { name: "TikTok", icon: "🎵", url: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">✦</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Élégante
                  </h3>
                  <p className="text-yellow-300 text-sm font-light tracking-widest">
                    BRIDAL COUTURE
                  </p>
                </div>
              </div>
            </Link>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating unforgettable moments and dream dresses for brides
              worldwide. Your journey to the perfect wedding dress starts here.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 bg-gray-800 hover:bg-yellow-500 rounded-xl flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/25"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500"></span>
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-6 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500"></span>
            </h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <span className="text-yellow-400 text-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {contact.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-white font-semibold mb-3">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-r-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
      
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Élégante Bridal Couture. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Shipping Policy", path: "/shipping" },
                { name: "Returns & Exchanges", path: "/returns" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-400 hover:text-yellow-300 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm mr-2">We Accept:</span>
              <div className="flex space-x-2">
                {["💳", "🏦", "📱", "🔒"].map((method, index) => (
                  <span
                    key={index}
                    className="text-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-2xl p-4 shadow-2xl shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 group cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center">
              <span className="text-lg">💬</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Need Help?</p>
              <p className="text-xs opacity-90">Chat with us</p>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
