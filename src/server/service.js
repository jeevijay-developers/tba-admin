import apiClient from './config';

// Event Gallery Services
export const eventGalleryService = {
  // Create new event gallery
  create: async (formData) => {
    const response = await apiClient.post('/api/v1/event-gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all event galleries
  getAll: async () => {
    const response = await apiClient.get('/api/v1/get-event-gallery');
    return response.data;
  },

  // Get event gallery by ID
  getById: async (id) => {
    const response = await apiClient.get(`/api/v1/get-event-gallery/${id}`);
    return response.data;
  },

  // Update event gallery (text only)
  update: async (eventData) => {
    const response = await apiClient.put('/api/v1/update-event-gallery', {
      blog: eventData
    });
    return response.data;
  },

  // Delete event gallery
  delete: async (id) => {
    const response = await apiClient.delete(`/api/v1/event-gallery/${id}`);
    return response.data;
  }
};

// Gallery Services
export const galleryService = {
  // Create new gallery
  create: async (formData) => {
    const response = await apiClient.post('/api/v1/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all galleries
  getAll: async () => {
    const response = await apiClient.get('/api/v1/get-gallery');
    return response.data;
  },

  // Get gallery by ID
  getById: async (id) => {
    const response = await apiClient.get(`/api/v1/get-gallery/${id}`);
    return response.data;
  },

  // Update gallery (text only)
  update: async (galleryData) => {
    const response = await apiClient.put('/api/v1/update-gallery', {
      gallery: galleryData
    });
    return response.data;
  },

  // Add images to existing gallery
  addImages: async (galleryData, images) => {
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
  },

  // Delete gallery
  delete: async (id) => {
    const response = await apiClient.delete(`/api/v1/gallery/${id}`);
    return response.data;
  }
};

// User Services
export const userService = {
  // Login user
  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/login-user', credentials);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await apiClient.post('/api/auth/register-user', userData);
    return response.data;
  },

  // Get all users
  getAll: async () => {
    const response = await apiClient.get('/api/auth/users');
    return response.data;
  },

  // Update user
  update: async (id, userData) => {
    const response = await apiClient.put(`/api/auth/users/${id}`, userData);
    return response.data;
  },

  // Upload user image
  uploadImage: async (id, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await apiClient.post(`/api/auth/upload-image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

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
