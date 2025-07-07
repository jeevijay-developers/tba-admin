"use client";

import apiCLient from '@/server/config';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Replace with actual API call when backend is ready
      const response = await apiCLient.post('/api/auth/login-user', {
        username: formData.username,
        password: formData.password
      });
      
      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }
      
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      router.push('/');
      
      console.log('Login submitted:', formData);

    } catch (err) {
      setError(err.message || 'An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-8 flex justify-center">
          {/* Replace with your actual logo */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff8547]">
            <span className="text-2xl font-bold text-white">TBA</span>
          </div>
        </div>
        
        <h1 className="mb-6 text-center text-2xl font-bold text-foreground">Admin Login</h1>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 bg-background p-2.5 text-sm text-foreground focus:border-[#ff8547] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50 dark:border-gray-600 dark:focus:border-[#ff8547]"
              placeholder="Enter your username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 bg-background p-2.5 text-sm text-foreground focus:border-[#ff8547] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50 dark:border-gray-600 dark:focus:border-[#ff8547]"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-[#ff8547] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#e67a40] focus:outline-none focus:ring-4 focus:ring-[#ff8547]/50 disabled:bg-[#ff8547]/70"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}