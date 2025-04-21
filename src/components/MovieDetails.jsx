import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import WatchlistContext from '../WatchlistContext';

function MovieDetails() {
  const { imdbID } = useParams();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);

  const { movie, loading, error } = useFetch(
    imdbID ? `https://www.omdbapi.com/?i=${imdbID}&apikey=ad5ca097` : null
  );

  if (loading) return <p className="text-center mt-4">Loading movie details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center">Movie not found</p>;

  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
          alt={`${movie.Title} Poster`}
          className="rounded-lg w-full h-auto object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.Title} ({movie.Year})</h2>
          <p className="mb-2"><strong>🎬 Genre:</strong> {movie.Genre}</p>
          <p className="mb-2"><strong>🎥 Director:</strong> {movie.Director}</p>
          <p className="mb-2"><strong>🎭 Actors:</strong> {movie.Actors}</p>
          <p className="mb-2"><strong>📝 Plot:</strong> {movie.Plot}</p>
          <p className="mb-4"><strong>⭐ IMDB Rating:</strong> {movie.imdbRating}</p>

          <div className="flex gap-4">
            {!isInWatchlist ? (
              <button
                onClick={() => addToWatchlist(movie)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                ➕ Add to Watchlist
              </button>
            ) : (
              <>
                <button
                  disabled
                  className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                >
                  ✅ Added
                </button>
                <button
                  onClick={() => removeFromWatchlist(movie.imdbID)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  ❌ Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;