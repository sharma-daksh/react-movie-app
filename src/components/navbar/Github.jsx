import React, { useEffect, useState } from 'react';

function Github() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://api.github.com/users/sharma-daksh')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching GitHub data:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center py-10">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <img
          src={data.avatar_url || 'https://via.placeholder.com/150'}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-400 shadow-md mb-6"
        />
        <h2 className="text-3xl font-bold text-yellow-400 mb-2 animate-pulse">
          {data.name || 'GitHub User'}
        </h2>
        <p className="text-lg text-gray-300 mb-4">@{data.login || 'username'}</p>
        <div className="flex justify-center gap-8 mb-4">
          <div>
            <span className="block text-2xl font-semibold text-white">{data.followers ?? 'N/A'}</span>
            <span className="text-gray-400 text-sm">Followers</span>
          </div>
          <div>
            <span className="block text-2xl font-semibold text-white">{data.following ?? 'N/A'}</span>
            <span className="text-gray-400 text-sm">Following</span>
          </div>
        </div>
        <a
          href={data.html_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default Github;
