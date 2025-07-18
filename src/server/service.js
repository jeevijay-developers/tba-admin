import apiClient from './config';

// Error handling utility
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || error.response.data.error || 'Server error occurred';
  } else if (error.request) {
    // Request was made but no response received
    return 'Unable to connect to server. Please check your connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred';
  }
};

// Event Gallery Services
export const eventGalleryService = {
  // Create new event gallery
  create: async (formData) => {
    try {
      const response = await apiClient.post('/api/v1/event-gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get all event galleries
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/v1/get-event-gallery');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get event gallery by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v1/get-event-gallery/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update event gallery (text only)
  update: async (eventData) => {
    try {
      const response = await apiClient.put('/api/v1/update-event-gallery', {
        blog: eventData
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete event gallery
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/event-gallery/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// Gallery Services
export const galleryService = {
  // Create new gallery
  create: async (formData) => {
    try {
      const response = await apiClient.post('/api/v1/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get all galleries
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/v1/get-gallery');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get gallery by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v1/get-gallery/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update gallery (text only)
  update: async (galleryData) => {
    try {
      const response = await apiClient.put('/api/v1/update-gallery', {
        gallery: galleryData
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Add images to existing gallery
  addImages: async (galleryData, images) => {
    try {
      const formData = new FormData();
      formData.append('gallery', JSON.stringify(galleryData));
      
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await apiClient.post('/api/v1/add-images-in-gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete gallery
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// User Services
export const userService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/api/auth/login-user', credentials);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/api/auth/register-user', userData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get all users
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/auth/users');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get users with pagination
  getUsers: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get(`/api/user/get-users?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Approve user
  approveUser: async (id) => {
    try {
      const response = await apiClient.put(`/api/user/approveuser/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Approve all users
  approveAllUsers: async () => {
    try {
      const response = await apiClient.put(`/api/user/approve-all`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Reject user
  rejectUser: async (id) => {
    try {
      const response = await apiClient.put(`/api/user/rejectuser/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  // Reject all users
  rejectAllUsers: async () => {
    try {
      const response = await apiClient.put(`/api/user/reject-all`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      const response = await apiClient.put(`/api/auth/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Upload user image
  uploadImage: async (id, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await apiClient.post(`/api/auth/upload-image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};
