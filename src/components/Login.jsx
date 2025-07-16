"use client";

import apiClient from '@/server/config';
import { useRouter } from 'next/navigation';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

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
      const response = await apiClient.post('/api/auth/login-user', {
        username: formData.username,
        password: formData.password
      });
      
      console.log('Response:', response.data);
      
      if(response.data.user.role === 'admin'){
        login(response.data.user);
        toast.success('Login successful!');
        router.push('/');
      } else {
        toast.error('You are not authorized to access this page');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response.data.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false);
      setFormData({
        username: '',
        password: ''
      });
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
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 bg-background p-2.5 pr-10 text-sm text-foreground focus:border-[#ff8547] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50 dark:border-gray-600 dark:focus:border-[#ff8547]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
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