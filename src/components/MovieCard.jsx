import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  if (!movie || movie.length === 0) {
    return <p className="text-center text-gray-400">No movies found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movie.map((movieItem) => (
        <div key={movieItem.imdbID} className="bg-white text-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
          <Link to={`/movie/${movieItem.imdbID}`} className="block">
            <img
              src={movieItem.Poster !== 'N/A' ? movieItem.Poster : 'https://via.placeholder.com/300x450'}
              alt={`${movieItem.Title} Poster`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movieItem.Title}</h3>
              {movieItem.imdbRating && <p className="text-sm text-gray-600">Rating: {movieItem.imdbRating}</p>}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;