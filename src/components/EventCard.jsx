"use client";
import React from 'react';
import { FaCalendar, FaMapMarkerAlt, FaEdit, FaEye } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const EventCard = ({ 
  event,
  onEdit,
  onView
}) => {
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
            onClick={() => onView?.(event)}
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
    </div>
  );
};

export default EventCard;