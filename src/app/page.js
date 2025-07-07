"use client";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import EventModal from "@/components/EventModal";
import { IoAdd } from "react-icons/io5";
import apiClient from "@/server/config";
import toast from "react-hot-toast";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/v1/get-event-gallery');
      setEvents(response.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    setIsEventModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
    // Refresh events when edit modal closes (in case event was updated)
    fetchEvents();
  };

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
    // Refresh events when modal closes (in case new event was added)
    fetchEvents();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Events Dashboard
              </h1>
              <p className="text-gray-600">
                Manage and view all Tax Bar Association events
              </p>
            </div>
            <button
              onClick={handleAddEvent}
              className="flex items-center gap-2 bg-[#ff8547] hover:bg-[#e67a40] text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e67a40] focus:ring-offset-2"
            >
              <IoAdd className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff8547]"></div>
          </div>
        )}

        {/* Events Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEdit={handleEditEvent}
              />
            ))}
          </div>
        )}

        {/* Empty State - shown when no events */}
        {!loading && events.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first event.</p>
          </div>
        )}
      </div>

      {/* Event Modal for Creating */}
      {isEventModalOpen && (
        <EventModal
          isOpen={isEventModalOpen}
          onClose={handleEventModalClose}
        />
      )}

      {/* Event Modal for Editing */}
      {isEditModalOpen && (
        <EventModal
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          initialData={selectedEvent}
        />
      )}
    </div>
  );
}