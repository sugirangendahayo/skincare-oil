// src/components/TypewriterComponent.jsx
import React from 'react';
import Typewriter from 'typewriter-effect';

const TypewriterComponent = ({ strings = ['Hello World!', 'This is a typewriter effect.'] }) => {
  return (
    <div className="text-xl  text-center py-8 text-white"> {/* Added text-white */}
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
          delay: 75, // Typing speed
        }}
      />
    </div>
  );
};

export default TypewriterComponent;