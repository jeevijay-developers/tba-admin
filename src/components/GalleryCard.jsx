"use client";
import React, { useState } from 'react';
import { FaImages, FaEdit, FaEye, FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const GalleryCard = ({ 
  gallery,
  onEdit
}) => {
  const [imageError, setImageError] = useState({});
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleViewGallery = () => {
    setIsViewModalOpen(true);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (gallery.images && currentImageIndex < gallery.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

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
            onClick={handleViewGallery}
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

      {/* Gallery View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-6xl max-h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 bg-white">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{gallery.title}</h2>
                <p className="text-sm text-gray-500">
                  {gallery.images?.length || 0} {gallery.images?.length === 1 ? 'image' : 'images'} • 
                  Created {formatDate(gallery.createdAt)}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row h-full max-h-[80vh]">
              {/* Main Image Display */}
              <div className="flex-1 bg-gray-900 relative flex items-center justify-center min-h-[300px]">
                {gallery.images && gallery.images.length > 0 ? (
                  <>
                    <img
                      src={gallery.images[currentImageIndex]?.url}
                      alt={`${gallery.title} - Image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xODcuNSA5My43NUwyMDYuMjUgMTEyLjVMMjEyLjUgMTA2LjI1TDIwMCAxMDBMMjEyLjUgODcuNUwyMDYuMjUgODEuMjVMMTg3LjUgMTAwVjkzLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
                      }}
                    />
                    
                    {/* Navigation Arrows */}
                    {gallery.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          disabled={currentImageIndex === 0}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <FaChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          disabled={currentImageIndex === gallery.images.length - 1}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <FaChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {gallery.images.length}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <FaImages className="w-16 h-16 mx-auto mb-4" />
                    <p>No images available</p>
                  </div>
                )}
              </div>

              {/* Thumbnail Sidebar */}
              {gallery.images && gallery.images.length > 1 && (
                <div className="w-full lg:w-64 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">All Images</h3>
                    <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {gallery.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageSelect(index)}
                          className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                            index === currentImageIndex 
                              ? 'border-[#ff8547] ring-2 ring-[#ff8547]/30' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xODcuNSA5My43NUwyMDYuMjUgMTEyLjVMMjEyLjUgMTA2LjI1TDIwMCAxMDBMMjEyLjUgODcuNUwyMDYuMjUgODEuMjVMMTg3LjUgMTAwVjkzLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 bg-white border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleCloseModal();
                    onEdit?.(gallery);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#ff8547] border border-transparent rounded-md hover:bg-[#e67a40] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
                >
                  Edit Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryCard;