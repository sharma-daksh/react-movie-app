import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchlistContext from './WatchlistContext';
import AppLayout from './components/AppLayout';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/navbar/Watchlist';
import Github from './components/navbar/Github';
import Home from './components/Home';
import Search from './components/Search';

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'search', element: <Search /> },
        { path: 'movie/:imdbID', element: <MovieDetails /> },
        { path: 'watchlist', element: <Watchlist /> },
        { path: 'github', element: <Github /> },
      ],
    },
    { path: '*', element: <h2>Page Not Found</h2> },
  ]);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      <RouterProvider router={router} />
    </WatchlistContext.Provider>
  );
}

export default App;