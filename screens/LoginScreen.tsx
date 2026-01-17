
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  // Fix: Use `currentUser` and `updateUserData` from `useAuth` which are provided by AuthContext.
  const { currentUser, updateUserData } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters.');
      return;
    }

    if (currentUser) {
      updateUserData({ ...currentUser, username: username.trim() });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">내공스</h1>
        <p className="text-sm text-center text-slate-500 mb-6">내가 스와힐리어 공부하려고 만든 앱</p>
        <h2 className="text-xl font-semibold text-center text-slate-700 mb-6">
          Set Your Username
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              placeholder={currentUser?.username || 'Enter your name'}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save and Start Learning
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
