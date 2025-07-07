"use client";
import React from 'react';
import { FaCalendar, FaMapMarkerAlt, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const EventCard = ({ 
  event = {
    title: "Annual Tax Law Conference 2025",
    desc: "Join us for an insightful conference on the latest updates in tax law, featuring renowned speakers and networking opportunities for tax professionals.",
    bannerImage: "/placeholder-banner.jpg",
    blog: {
      bhead: "Tax Law Updates and Professional Development",
      blogPara1: "This conference will cover the most recent changes in tax legislation, best practices for tax planning, and emerging trends in the industry. Attendees will gain valuable insights from expert speakers and have the opportunity to network with fellow professionals.",
      bImage1: "/placeholder-blog.jpg"
    },
    date: "March 15, 2025",
    location: "Tax Bar Association Hall",
    status: "upcoming"
  },
  onEdit,
  onDelete,
  onView
}) => {

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Banner Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xODcuNSA5My43NUwyMDYuMjUgMTEyLjVMMjEyLjUgMTA2LjI1TDIwMCAxMDBMMjEyLjUgODcuNUwyMDYuMjUgODEuMjVMMTg3LjUgMTAwVjkzLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
          </span>
        </div>
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

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MdDateRange className="w-4 h-4 mr-2 text-[#ff8547]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-[#ff8547]" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Blog Preview */}
        <div className="border-t border-gray-100 pt-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            {truncateText(event.blog.bhead, 50)}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-2">
            {truncateText(event.blog.blogPara1, 80)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onView?.(event)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-[#ff8547] hover:bg-[#ff8547]/10 rounded-md transition-colors duration-200"
          >
            <FaEye className="w-3 h-3" />
            View Details
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(event)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              <FaEdit className="w-3 h-3" />
              Edit
            </button>
            
            <button
              onClick={() => onDelete?.(event)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
            >
              <FaTrash className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;