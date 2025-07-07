"use client";
import React, { useState } from 'react';
import { FaEdit, FaEye, FaTimes } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const EventCard = ({ 
  event,
  onEdit
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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

  const handleViewDetails = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Banner Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={event.bannerImage || '/placeholder-banner.jpg'}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xODcuNSA5My43NUwyMDYuMjUgMTEyLjVMMjEyLjUgMTA2LjI1TDIwMCAxMDBMMjEyLjUgODcuNUwyMDYuMjUgODEuMjVMMTg3LjUgMTAwVjkzLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(event.desc, 120)}
        </p>

        {/* Event Date */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MdDateRange className="w-4 h-4 mr-2 text-[#ff8547]" />
            <span>{formatDate(event.createdAt)}</span>
          </div>
        </div>

        {/* Blog Preview */}
        {event.blog && (
          <div className="border-t border-gray-100 pt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              {truncateText(event.blog.bhead, 50)}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-2">
              {truncateText(event.blog.blogPara1, 80)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleViewDetails}
            className="flex items-center gap-1 px-3 py-2 text-sm text-[#ff8547] hover:bg-[#ff8547]/10 rounded-md transition-colors duration-200"
          >
            <FaEye className="w-3 h-3" />
            View Details
          </button>
          
          <button
            onClick={() => onEdit?.(event)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
          >
            <FaEdit className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>

      {/* Detail View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Banner Image */}
              <div className="mb-6">
                <img
                  src={event.bannerImage || '/placeholder-banner.jpg'}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xODcuNSA5My43NUwyMDYuMjUgMTEyLjVMMjEyLjUgMTA2LjI1TDIwMCAxMDBMMjEyLjUgODcuNUwyMDYuMjUgODEuMjVMMTg3LjUgMTAwVjkzLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
                  }}
                />
              </div>

              {/* Event Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Event Details */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                  
                  <div className="mb-6">
                    <div className="flex items-center text-gray-600 mb-2">
                      <MdDateRange className="w-5 h-5 mr-3 text-[#ff8547]" />
                      <span className="font-medium">Created: {formatDate(event.createdAt)}</span>
                    </div>
                    {event.updatedAt && event.updatedAt !== event.createdAt && (
                      <div className="flex items-center text-gray-600">
                        <MdDateRange className="w-5 h-5 mr-3 text-[#ff8547]" />
                        <span className="font-medium">Updated: {formatDate(event.updatedAt)}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{event.desc}</p>
                  </div>
                </div>

                {/* Right Column - Blog Content */}
                {event.blog && (
                  <div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Content</h3>
                      
                      <h4 className="text-xl font-bold text-gray-800 mb-4">{event.blog.bhead}</h4>
                      
                      {event.blog.bImage1 && (
                        <div className="mb-4">
                          <img
                            src={event.blog.bImage1}
                            alt="Blog"
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xODcuNSA5My43NUwyMDYuMjUgMTEyLjVMMjEyLjUgMTA2LjI1TDIwMCAxMDBMMjEyLjUgODcuNUwyMDYuMjUgODEuMjVMMTg3LjUgMTAwVjkzLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.blog.blogPara1}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
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
                      onEdit?.(event);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#ff8547] border border-transparent rounded-md hover:bg-[#e67a40] focus:outline-none focus:ring-2 focus:ring-[#ff8547]/50"
                  >
                    Edit Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;