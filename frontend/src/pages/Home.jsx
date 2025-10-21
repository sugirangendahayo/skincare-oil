// src/pages/Home.jsx
import React from 'react';
import TypewriterComponent from '../components/TypewriterComponent';
import HeroImage from "../assets/hero-image.png";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className='h-screen bg-black flex items-center justify-center px-8 '>
        <div className='flex justify-between gap-4 items-center'>
          <div className='w-1/2'> 
            <h1 className='text-4xl text-white font-bold'>Discover the best skincare products from Hair<span className='text-red-500'>iat</span></h1>
            <TypewriterComponent strings={['Discover the best skincare products.', 'Glow up your routine!']} />
            <Link to="/signup" className='inline-block mt-4 px-6 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:rotate-1 transition-all duration-300'>
              Get Started
            </Link>
          </div>
          <div className='w-1/2'> 
            <img src={HeroImage} alt="Hero image" className='w-full h-full object-cover' />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;