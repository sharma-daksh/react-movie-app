import React, { useContext } from 'react';
import WatchlistContext from '../../WatchlistContext';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-yellow-400">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">Your watchlist is empty. Add some movies!</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlist.map((movie) => (
              <li key={movie.imdbID} className="bg-white text-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3>
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                    alt={`${movie.Title} Poster`}
                    className="w-full h-64 object-cover rounded-md mb-2"
                  />
                  <button
                    onClick={() => removeFromWatchlist(movie.imdbID)}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Watchlist;