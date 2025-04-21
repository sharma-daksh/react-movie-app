import { useState, useEffect } from 'react';

function useFetch(url, isList = false) {
  const [movie, setMovie] = useState(isList ? [] : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setMovie(isList ? [] : null);
      return;
    }

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        const finalData = await response.json();
        if (isList) {
          if (finalData.Search) {
            setMovie(finalData.Search);
          } else {
            setMovie([]);
          }
        } else {
          if (finalData.Response === 'True') {
            setMovie(finalData);
          } else {
            setError(finalData.Error || 'Movie not found');
          }
        }
      } catch (err) {
        setError('Failed to fetch movie details');
        if (isList) setMovie([]);
        else setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [url, isList]);

  return { movie, loading, error };
}

export default useFetch;