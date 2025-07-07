"use client";
import { useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";
import GalleryModal from "./GalleryModal";
import { IoAdd } from "react-icons/io5";
import apiClient from "@/server/config";
import toast from "react-hot-toast";

const Gallery = () => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch galleries from API
  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await apiClient.get('/api/v1/get-gallery');
      setGalleries(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Failed to fetch gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGallery = () => {
    setIsGalleryModalOpen(true);
  };

  const handleEditGallery = (gallery) => {
    setSelectedGallery(gallery);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedGallery(null);
  };

  const handleGalleryModalClose = () => {
    setIsGalleryModalOpen(false);
    // Refresh galleries when modal closes (in case new gallery was added)
    fetchGalleries();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gallery Management
              </h1>
              <p className="text-gray-600">
                Manage and view all Tax Bar Association photo galleries
              </p>
            </div>
            <button
              onClick={handleAddGallery}
              className="flex items-center gap-2 bg-[#ff8547] hover:bg-[#e67a40] text-white px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e67a40] focus:ring-offset-2"
            > Add Gallery
              <IoAdd className="w-4 h-4" />
              {/* Add Gallery */}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff8547]"></div>
          </div>
        )}

        {/* Galleries Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
              <GalleryCard
                key={gallery._id}
                gallery={gallery}
                onEdit={handleEditGallery}
              />
            ))}
          </div>
        )}

        {/* Empty State - shown when no galleries */}
        {!loading && galleries.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No galleries found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first photo gallery.</p>
          </div>
        )}
      </div>

      {/* Gallery Modal for Creating */}
      {isGalleryModalOpen && (
        <GalleryModal
          isOpen={isGalleryModalOpen}
          onClose={handleGalleryModalClose}
        />
      )}

      {/* Gallery Modal for Editing */}
      {isEditModalOpen && (
        <GalleryModal
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          initialData={selectedGallery}
        />
      )}
    </div>
  );
};

export default Gallery;