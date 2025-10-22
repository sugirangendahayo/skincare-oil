/* eslint-disable no-unused-vars */
// src/pages/Home.js - Wedding Dresses Home Page
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const collections = [
    {
      id: 1,
      name: "Classic A-Line",
      image:
        "https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Timeless elegance with flowing silhouettes",
    },
    {
      id: 2,
      name: "Mermaid & Trumpet",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Dramatic curves and sophisticated style",
    },
    {
      id: 3,
      name: "Bohemian Romance",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Free-spirited and effortlessly beautiful",
    },
    {
      id: 4,
      name: "Modern Minimalist",
      image:
        "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Clean lines and contemporary elegance",
    },
  ];

  const designers = [
    {
      name: "Vera Wang",
      specialty: "Architectural Romance",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Oscar de la Renta",
      specialty: "Timeless Luxury",
      image:
        "https://images.unsplash.com/photo-1519657337289-0776531f13cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Monique Lhuillier",
      specialty: "Feminine Elegance",
      image:
        "https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
  ];

  const testimonials = [
    {
      quote:
        "I found my dream dress at Élégante. The experience was magical from start to finish.",
      author: "Sarah Mitchell",
      wedding: "June Wedding, Tuscany",
    },
    {
      quote:
        "The attention to detail and personalized service made me feel like a true princess.",
      author: "Emily Chen",
      wedding: "Beach Wedding, Santorini",
    },
    {
      quote:
        "From the first fitting to the final adjustment, every moment was perfect. Thank you!",
      author: "Jessica Rodriguez",
      wedding: "Garden Wedding, Napa Valley",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-white text-2xl">✦</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Your Dream Dress
              <br />
              <span className="text-rose-200">Awaits</span>
            </h1>
            <p className="text-xl md:text-2xl text-rose-100 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover bespoke wedding dresses crafted with love, precision, and
              timeless elegance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/collections"
              className="bg-white text-rose-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-rose-50 hover:shadow-2xl hover:shadow-rose-200/50 transition-all duration-300 transform hover:scale-105"
            >
              Explore Collections
            </Link>
            <Link
              to="/appointments"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-105"
            >
              Book Consultation
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-rose-200 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-rose-200 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Signature <span className="text-rose-500">Collections</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated with love, each collection tells a unique story of romance
              and elegance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-serif font-bold text-white mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-rose-100 text-sm mb-4">
                      {collection.description}
                    </p>
                    <Link
                      to={`/collections/${collection.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-white font-semibold hover:text-rose-200 transition-colors duration-300"
                    >
                      Discover
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/collections"
              className="inline-flex items-center bg-rose-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-300/50 transition-all duration-300 transform hover:scale-105"
            >
              View All Collections
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Bridal Experience */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="text-rose-500 font-semibold uppercase tracking-wider text-sm">
                  The Experience
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mt-2 mb-6">
                  Your Personal{" "}
                  <span className="text-rose-500">Bridal Journey</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Step into our exclusive bridal suite where dreams become
                  reality. Our expert consultants provide personalized attention
                  in a luxurious, intimate setting.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "🎯",
                    title: "Personal Styling",
                    description:
                      "One-on-one consultations with our bridal experts",
                  },
                  {
                    icon: "✂️",
                    title: "Custom Alterations",
                    description:
                      "Perfect fit guaranteed with our master tailors",
                  },
                  {
                    icon: "💎",
                    title: "Premium Accessories",
                    description: "Complete your look with curated accessories",
                  },
                  {
                    icon: "📸",
                    title: "Bridal Photography",
                    description: "Capture the moment in our styled settings",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-rose-50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 text-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/bridal-suite"
                className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Explore Bridal Suite
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Bridal Consultation"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Dress Fitting"
                  className="w-full h-32 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Bridal Accessories"
                  className="w-full h-32 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1519657337289-0776531f13cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Luxury Interior"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designers */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              World-Renowned <span className="text-rose-500">Designers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Featuring exclusive collections from the most celebrated names in
              bridal fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designers.map((designer, index) => (
              <div
                key={index}
                className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-rose-100 group-hover:border-rose-200 transition-colors duration-300">
                  <img
                    src={designer.image}
                    alt={designer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                  {designer.name}
                </h3>
                <p className="text-rose-500 font-medium mb-4">
                  {designer.specialty}
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  Exclusive collection available only at Élégante Bridal Couture
                </p>
                <Link
                  to={`/designers/${designer.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="inline-flex items-center text-rose-500 font-semibold hover:text-rose-600 transition-colors duration-300"
                >
                  View Collection
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Love <span className="text-rose-500">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from brides who found their perfect dress at Élégante
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-rose-50 rounded-2xl p-8 relative group hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                {/* Quote Icon */}
                <div className="text-6xl text-rose-200 absolute -top-4 -left-4 opacity-50">
                  "
                </div>

                <p className="text-gray-700 text-lg italic mb-6 relative z-10 leading-relaxed">
                  {testimonial.quote}
                </p>

                <div className="border-t border-rose-200 pt-6">
                  <p className="font-semibold text-gray-800">
                    {testimonial.author}
                  </p>
                  <p className="text-rose-500 text-sm">{testimonial.wedding}</p>
                </div>

                {/* Floating hearts */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-rose-300 text-xl">💖</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Begin Your Bridal Journey
          </h2>
          <p className="text-rose-100 text-xl mb-8 max-w-2xl mx-auto">
            Schedule your private consultation and discover the dress of your
            dreams in our exclusive bridal suite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/appointments"
              className="bg-white text-rose-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-rose-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book Appointment
            </Link>
            <Link
              to="/collections"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-105"
            >
              Browse Collections
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-2xl font-bold mb-2">500+</div>
              <div className="text-rose-100 text-sm">Designer Dresses</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">50+</div>
              <div className="text-rose-100 text-sm">Exclusive Designers</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">1000+</div>
              <div className="text-rose-100 text-sm">Happy Brides</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
