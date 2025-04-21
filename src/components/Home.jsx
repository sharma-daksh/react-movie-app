import React from 'react';
import bgImage from './bg.movierealm.jpg';

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex items-center justify-center py-10 relative" // Added relative positioning
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Semi-transparent black overlay */}

      {/* Content */}
      <div className="text-center px-4 relative z-10"> {/* Added relative positioning and z-index */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 animate-pulse">🎬 Welcome to MOVIEREALM!</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Browse movies, add them to your watchlist, and never miss a great film again.
        </p>
        <a
          href="/search"
          className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Start Exploring
        </a>
      </div>
    </div>
  );
}

export default Home;
