// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Founder & Creative Director",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      bio: "With over 15 years in bridal fashion design, Sarah founded our boutique to create unforgettable wedding dress experiences.",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Head Designer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      bio: "Master of couture and bridal design, specializing in creating custom gowns that reflect each bride's unique personality.",
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Bridal Consultant",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      bio: "Bridal industry expert with a passion for helping brides find their perfect dress and creating magical moments.",
    },
    {
      id: 4,
      name: "James Kim",
      role: "Customer Experience",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      bio: "Dedicated to ensuring every bride feels cherished and supported throughout her wedding dress journey.",
    },
  ];

  const values = [
    {
      icon: "👰",
      title: "Premium Fabrics",
      description:
        "We source only the finest silks, laces, and materials from renowned suppliers around the world.",
    },
    {
      icon: "✂️",
      title: "Expert Craftsmanship",
      description:
        "Every gown is meticulously crafted by skilled artisans with attention to every detail.",
    },
    {
      icon: "💫",
      title: "Custom Designs",
      description:
        "We offer bespoke services to create one-of-a-kind dresses that tell your unique love story.",
    },
    {
      icon: "💝",
      title: "Bride First",
      description:
        "Your vision, comfort, and happiness are at the heart of everything we create.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "Boutique Founded",
      description: "Started with a vision to redefine bridal fashion",
    },
    {
      year: "2019",
      event: "First Collection",
      description: "Launched our signature wedding dress line",
    },
    {
      year: "2020",
      event: "1,000 Brides",
      description: "Helped our first thousand brides say yes to the dress",
    },
    {
      year: "2022",
      event: "International Design",
      description: "Started creating dresses for international clients",
    },
    {
      year: "2023",
      event: "Award Winning",
      description: "Received Bridal Fashion Excellence Award",
    },
    {
      year: "2024",
      event: "5,000+ Brides",
      description: "Celebrated creating dresses for over 5,000 brides",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-rose-500 text-sm font-medium">
                  Our Story
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Creating <span className="text-rose-500">Dream Dresses</span>{" "}
                For Your Special Day
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                At our boutique, we believe every bride deserves to feel
                absolutely breathtaking on her wedding day. Our journey began
                with a simple mission: craft exquisite wedding dresses that
                capture your unique love story.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/collection"
                  className="bg-rose-500 text-black font-bold py-4 px-8 rounded-xl hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Explore Our Collection
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

                <button className="border-2 border-rose-500 text-rose-400 font-bold py-4 px-8 rounded-xl hover:bg-rose-500/10 transition-all duration-300 transform hover:scale-105">
                  Our Philosophy
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1519657337289-0776534f3063?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Wedding dress design studio"
                    className="rounded-2xl h-48 w-full object-cover shadow-2xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Luxury fabrics and lace"
                    className="rounded-2xl h-32 w-full object-cover shadow-2xl"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Dress craftsmanship"
                    className="rounded-2xl h-32 w-full object-cover shadow-2xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Beautiful wedding dress"
                    className="rounded-2xl h-48 w-full object-cover shadow-2xl"
                  />
                </div>
              </div>

              {/* Floating Element */}
              <div className="absolute -bottom-6 -right-6 bg-rose-500 text-black py-3 px-6 rounded-2xl shadow-2xl">
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-sm">Happy Brides</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-rose-500">Mission</span> & Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're committed to creating wedding dresses that not only make you
              look stunning but also make you feel confident, comfortable, and
              truly yourself on your special day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-rose-500">Journey</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-500 to-rose-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300">
                      <div className="text-rose-500 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-rose-500 rounded-full border-4 border-black z-10"></div>

                  {/* Empty Space */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Meet Our <span className="text-rose-500">Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate experts dedicated to making your wedding dress
              experience magical through creative design, meticulous
              craftsmanship, and heartfelt service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-rose-500 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex space-x-3 mt-4">
                    <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-black transition-all duration-300">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-black transition-all duration-300">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Ready to Find Your Dream Dress?
          </h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of beautiful brides who found their perfect wedding
            dress with us. Your journey to the dress of your dreams starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collection"
              className="bg-black text-rose-500 font-bold py-4 px-8 rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Browse Dresses
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
            <Link
              to="/contact"
              className="border-2 border-black text-black font-bold py-4 px-8 rounded-xl hover:bg-black hover:text-rose-500 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Book Consultation
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
