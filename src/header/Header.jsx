import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex gap-6 justify-center text-lg font-semibold">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-yellow-400' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => (isActive ? 'text-yellow-400' : '')}>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/watchlist" className={({ isActive }) => (isActive ? 'text-yellow-400' : '')}>
            Watchlist
          </NavLink>
        </li>
        <li>
          <NavLink to="/github" className={({ isActive }) => (isActive ? 'text-yellow-400' : '')}>
            Github
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;