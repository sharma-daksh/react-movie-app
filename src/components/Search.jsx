import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import MovieCard from './MovieCard';

function Search() {
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('https://www.omdbapi.com/?apikey=ad5ca097&s=');
  const { movie: initialMovie, loading, error } = useFetch(url, true);
  const [sortBy, setSortBy] = useState('none');
  const [detailedMovies, setDetailedMovies] = useState([]);

  useEffect(() => {
    if (initialMovie && initialMovie.length > 0) {
      const fetchDetails = async () => {
        const limitedMovies = initialMovie.slice(0, 5); // Limit to 5 for performance
        const details = await Promise.all(
          limitedMovies.map((m) =>
            fetch(`https://www.omdbapi.com/?i=${m.imdbID}&apikey=ad5ca097`).then((res) =>
              res.json()
            )
          )
        );
        const validDetails = details.filter((m) => m.Response === 'True');
        console.log('Detailed Movies:', validDetails); // Debug: Check fetched data
        setDetailedMovies(validDetails);
      };
      fetchDetails();
    } else {
      setDetailedMovies([]);
    }
  }, [initialMovie]);

  const sortedMovies = React.useMemo(() => {
    let sorted = [...(detailedMovies.length > 0 && detailedMovies.every(m => m.imdbRating !== undefined) ? detailedMovies : initialMovie || [])];
    console.log('Sorting with:', { sortBy, detailedMovies, initialMovie, sorted }); // Debug: Trace sorting input
    if (sortBy === 'popularity') {
      sorted.sort((a, b) => {
        const ratingA = parseFloat(a.imdbRating) || (a.imdbRating === 'N/A' ? 0 : -1);
        const ratingB = parseFloat(b.imdbRating) || (b.imdbRating === 'N/A' ? 0 : -1);
        if (ratingA === -1 && ratingB === -1) return a.Title.localeCompare(b.Title); // Fallback to title if both unrated
        return ratingB - ratingA; // Descending order by rating
      });
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => a.Title.localeCompare(b.Title)); // Alphabetical by title
    }
    return sorted;
  }, [detailedMovies, initialMovie, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setUrl(`https://www.omdbapi.com/?apikey=ad5ca097&s=${query}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-4 flex justify-center">

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition duration-200"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mb-6">
          <label htmlFor="sort" className="mr-2 text-gray-700 font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="popularity">Popularity</option>
            <option value="title">Title</option>
          </select>
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && sortedMovies.length === 0 && (
          <p className="text-center text-gray-600">No movies found</p>
        )}
        {!loading && !error && sortedMovies.length > 0 && <MovieCard movie={sortedMovies} />}
      </div>
    </div>
  );
}

export default Search;
