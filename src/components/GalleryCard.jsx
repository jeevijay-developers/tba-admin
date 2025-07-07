"use client";
import React, { useState } from 'react';
import { FaImages, FaEdit, FaEye, FaExpand } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const GalleryCard = ({ 
  gallery,
  onEdit,
  onView
}) => {
  const [imageError, setImageError] = useState({});

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const handleImageError = (imageIndex) => {
    setImageError(prev => ({ ...prev, [imageIndex]: true }));
  };

  const getImageGridClass = (imageCount) => {
    if (imageCount === 1) return 'grid-cols-1';
    if (imageCount === 2) return 'grid-cols-2';
    if (imageCount === 3) return 'grid-cols-2';
    return 'grid-cols-2';
  };

  const getDisplayImages = () => {
    if (!gallery.images || gallery.images.length === 0) return [];
    return gallery.images.slice(0, 4); // Show max 4 images in preview
  };

  const displayImages = getDisplayImages();
  const remainingCount = gallery.images?.length > 4 ? gallery.images.length - 4 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Image Preview Section */}
      <div className="relative h-48 bg-gray-100">
        {displayImages.length > 0 ? (
          <div className={`grid ${getImageGridClass(displayImages.length)} gap-1 h-full`}>
            {displayImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden">
                {index === 3 && remainingCount > 0 ? (
                  // Overlay for "more images" on 4th image
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={`${gallery.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <div className="text-white text-center">
                        <FaImages className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-sm font-medium">+{remainingCount} more</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={imageError[index] ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xODcuNSA5My43NUwyMDYuMjUgMTEyLjVMMjEyLjUgMTA2LjI1TDIwMCAxMDBMMjEyLjUgODcuNUwyMDYuMjUgODEuMjVMMTg3LjUgMTAwVjkzLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K' : image.url}
                    alt={`${gallery.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          // No images placeholder
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <FaImages className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">No images available</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Gallery Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {gallery.title}
        </h3>

        {/* Image Count */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaImages className="w-4 h-4 mr-2 text-[#ff8547]" />
          <span>{gallery.images?.length || 0} {gallery.images?.length === 1 ? 'image' : 'images'}</span>
        </div>

        {/* Creation Date */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MdDateRange className="w-4 h-4 mr-2 text-[#ff8547]" />
            <span>{formatDate(gallery.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onView?.(gallery)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-[#ff8547] hover:bg-[#ff8547]/10 rounded-md transition-colors duration-200"
          >
            <FaEye className="w-3 h-3" />
            View Gallery
          </button>
          
          <button
            onClick={() => onEdit?.(gallery)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
          >
            <FaEdit className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;