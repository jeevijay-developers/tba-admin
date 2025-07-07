"use client";
import { useState } from "react";
import EventCard from "@/components/EventCard";
import EventModal from "@/components/EventModal";

export default function Home() {
  // Sample events data - replace with actual data from your API
  const [events, setEvents] = useState([
    {
      id: 1,
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
    {
      id: 2,
      title: "Professional Development Workshop",
      desc: "A hands-on workshop focused on advanced tax planning strategies and client relationship management for tax professionals.",
      bannerImage: "/placeholder-banner.jpg",
      blog: {
        bhead: "Advanced Tax Planning Strategies",
        blogPara1: "Learn cutting-edge techniques for tax optimization, client consultation best practices, and how to stay ahead in the competitive tax advisory market.",
        bImage1: "/placeholder-blog.jpg"
      },
      date: "April 22, 2025",
      location: "Professional Development Center",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Tax Technology Summit",
      desc: "Explore the latest technological innovations in tax preparation and compliance. Learn about AI tools, automation, and digital transformation in tax practices.",
      bannerImage: "/placeholder-banner.jpg",
      blog: {
        bhead: "Digital Innovation in Tax Services",
        blogPara1: "Discover how technology is revolutionizing tax preparation, client services, and practice management. Network with tech-savvy tax professionals.",
        bImage1: "/placeholder-blog.jpg"
      },
      date: "May 10, 2025",
      location: "Tech Innovation Hub",
      status: "upcoming"
    }
  ]);

  // State for managing the edit modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Event handlers
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteEvent = (event) => {
    if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
      setEvents(events.filter(e => e.id !== event.id));
    }
  };

  const handleViewEvent = (event) => {
    // You can implement a detailed view modal here
    alert(`Viewing event: ${event.title}\n\nDescription: ${event.desc}\n\nDate: ${event.date}\nLocation: ${event.location}`);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TBA Events Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and view all Tax Bar Association events
          </p>
          
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>Total Events: <span className="font-semibold text-gray-900">{events.length}</span></span>
            <span>•</span>
            <span>Upcoming: <span className="font-semibold text-blue-600">{events.filter(e => e.status === 'upcoming').length}</span></span>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onView={handleViewEvent}
            />
          ))}
        </div>

        {/* Empty State - shown when no events */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first event using the Add Event button in the navbar.</p>
          </div>
        )}

        {/* Quick Stats Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-semibold text-gray-900">{events.filter(e => e.status === 'upcoming').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Event Modal */}
      <EventModal 
        isOpen={isEditModalOpen} 
        onClose={handleModalClose}
        initialData={selectedEvent}
      />
    </div>
  );
}
