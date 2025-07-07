"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { IoAdd } from 'react-icons/io5'
import { MdPhotoLibrary, MdLogout } from 'react-icons/md'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleAddEvent = () => {
    // Add event functionality
    console.log('Add Event clicked')
    setIsMenuOpen(false) // Close menu after action
  }

  const handleAddGallery = () => {
    // Add gallery functionality
    console.log('Add Gallery clicked')
    setIsMenuOpen(false) // Close menu after action
  }

  const handleLogout = () => {
    // Logout functionality
    console.log('Logout clicked')
    setIsMenuOpen(false) // Close menu after action
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="h-12 w-auto lg:h-16"
              />
            </div>
            <div className="ml-3 hidden sm:block">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-800">TBA Admin</h1>
            </div>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              onClick={handleAddEvent}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <IoAdd className="w-4 h-4" />
              Add Event
            </button>
            
            <button
              onClick={handleAddGallery}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <IoAdd className="w-4 h-4" />
              Add Gallery
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <MdLogout className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            {/* Mobile title for smaller screens */}
            <div className="sm:hidden mb-3">
              <h1 className="text-lg font-semibold text-gray-800">TBA Admin</h1>
            </div>
            
            <button
              onClick={handleAddEvent}
              className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <IoAdd className="w-5 h-5" />
              Add Event
            </button>
            
            <button
              onClick={handleAddGallery}
              className="w-full flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <IoAdd className="w-5 h-5" />
              Add Gallery
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <MdLogout className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar