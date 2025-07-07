"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import EventModal from './EventModal';
import GalleryModal from './GalleryModal';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const router = useRouter();
  const handleAddEvent = () => {
    setIsEventModalOpen(true);
    setIsMenuOpen(false) // Close menu after action
  }

  const handleAddGallery = () => {
    setIsGalleryModalOpen(true);
    setIsMenuOpen(false) // Close menu after action
  }

  const handleLogout = () => {
    // Remove admin user from localStorage
    localStorage.removeItem('adminUser');
    // You might want to redirect to login page here
    router.push('/login');
    toast.success('Logged out successfully!');
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
                className="h-20 w-auto lg:h-16"
              />
            </div>
            {/* <div className="ml-3 hidden sm:block">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-800">TBA Admin</h1>
            </div> */}
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              onClick={handleAddEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Event
            </button>

            <button
              onClick={handleAddGallery}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Gallery
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
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
            {/* <div className="sm:hidden mb-3">
              <h1 className="text-lg font-semibold text-gray-800">TBA Admin</h1>
            </div> */}

            <button
              onClick={handleAddEvent}
              className="w-full text-left bg-[#ff8547] hover:bg-[#e67a40] text-white px-4 py-3 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e67a40] focus:ring-offset-2"
            >
              Add Event
            </button>

            <button
              onClick={handleAddGallery}
              className="w-full text-left bg-[#ff8547] hover:bg-[#e67a40] text-white px-4 py-3 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e67a40] focus:ring-offset-2"
            >
              Add Gallery
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Event Modal - placed outside nav structure so it appears on both desktop and mobile */}
      {isEventModalOpen && (
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
        />
      )}

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <GalleryModal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar