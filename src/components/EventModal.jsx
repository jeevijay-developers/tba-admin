"use client";

import { useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { eventGalleryService, handleApiError } from '@/server/service';

export default function EventModal({ isOpen, onClose, initialData = null }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    bannerImage: initialData?.bannerImage || '',
    desc: initialData?.desc || '',
    blog: {
      bhead: initialData?.blog?.bhead || '',
      blogPara1: initialData?.blog?.blogPara1 || '',
      bImage1: initialData?.blog?.bImage1 || ''
    }
  });

  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('blog.')) {
      const blogField = name.replace('blog.', '');
      setFormData(prev => ({
        ...prev,
        blog: {
          ...prev.blog,
          [blogField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'banner') {
        setBannerImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            bannerImage: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else if (type === 'blog') {
        setBlogImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            blog: {
              ...prev.blog,
              bImage1: e.target.result
            }
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Event title is required');
      return;
    }
    if (!formData.desc.trim()) {
      toast.error('Event description is required');
      return;
    }
    if (!formData.blog.bhead.trim()) {
      toast.error('Blog heading is required');
      return;
    }
    if (!formData.blog.blogPara1.trim()) {
      toast.error('Blog content is required');
      return;
    }

    // For new events, images are required
    if (!initialData) {
      if (!bannerImageFile) {
        toast.error('Banner image is required');
        return;
      }
      if (!blogImageFile) {
        toast.error('Blog image is required');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (initialData) {
        // Update existing event (text fields only)
        const updateData = {
          _id: initialData._id,
          title: formData.title,
          desc: formData.desc,
          blog: {
            bhead: formData.blog.bhead,
            blogPara1: formData.blog.blogPara1,
            bImage1: formData.blog.bImage1 // Keep existing image URL
          }
        };

        await eventGalleryService.update(updateData);
        toast.success('Event updated successfully!');
      } else {
        // Create new event
        const submitFormData = new FormData();
        
        // Add text fields
        submitFormData.append('title', formData.title);
        submitFormData.append('desc', formData.desc);
        submitFormData.append('bhead', formData.blog.bhead);
        submitFormData.append('blogPara1', formData.blog.blogPara1);
        
        // Add image files
        submitFormData.append('bannerImage', bannerImageFile);
        submitFormData.append('bImage1', blogImageFile);

        await eventGalleryService.create(submitFormData);
        toast.success('Event created successfully!');
      }
      
      handleClose();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      bannerImage: '',
      desc: '',
      blog: {
        bhead: '',
        blogPara1: '',
        bImage1: ''
      }
    });
    setBannerImageFile(null);
    setBlogImageFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Event Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#ff8547] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
                placeholder="Enter event title"
              />
            </div>

            {/* Event Description */}
            <div className="md:col-span-2">
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
                Event Description *
              </label>
              <textarea
                id="desc"
                name="desc"
                rows={4}
                value={formData.desc}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#ff8547] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
                placeholder="Enter event description"
              />
            </div>

            {/* Banner Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image *
              </label>
              <div className="flex flex-col space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'banner')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#ff8547] file:text-white hover:file:bg-[#e67a40]"
                />
                {formData.bannerImage && (
                  <div className="relative">
                    <img
                      src={formData.bannerImage}
                      alt="Banner preview"
                      className="h-32 w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Blog Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blog Heading */}
              <div className="md:col-span-2">
                <label htmlFor="blog.bhead" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Heading *
                </label>
                <input
                  id="blog.bhead"
                  name="blog.bhead"
                  type="text"
                  value={formData.blog.bhead}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#ff8547] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
                  placeholder="Enter blog heading"
                />
              </div>

              {/* Blog Content */}
              <div className="md:col-span-2">
                <label htmlFor="blog.blogPara1" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content *
                </label>
                <textarea
                  id="blog.blogPara1"
                  name="blog.blogPara1"
                  rows={6}
                  value={formData.blog.blogPara1}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#ff8547] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
                  placeholder="Enter blog content"
                />
              </div>

              {/* Blog Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Image *
                </label>
                <div className="flex flex-col space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'blog')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#ff8547] file:text-white hover:file:bg-[#e67a40]"
                  />
                  {formData.blog.bImage1 && (
                    <div className="relative">
                      <img
                        src={formData.blog.bImage1}
                        alt="Blog preview"
                        className="h-32 w-full object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#ff8547] border border-transparent rounded-md hover:bg-[#e67a40] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {initialData ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                initialData ? 'Update Event' : 'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
