import api from './api';

/**
 * OZARIX TECHNOLOGY API Service Layer
 * Connects React frontend directly to Spring Boot REST endpoints.
 */

export const authService = {
  // POST /api/auth/login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // POST /api/auth/register
  register: async (name, email, password, confirmPassword) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  },

  // GET /api/auth/users
  getAllUsers: async () => {
    const response = await api.get('/auth/users');
    return response.data;
  },
};

export const contactService = {
  // Public: POST /api/contact
  submitContact: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  // ADMIN: GET /api/contact
  getAllContacts: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  // ADMIN: PUT /api/contact/{id}
  updateContact: async (id, contactData) => {
    const response = await api.put(`/contact/${id}`, contactData);
    return response.data;
  },

  // ADMIN: DELETE /api/contact/{id}
  deleteContact: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};

export const consultationService = {
  // Public: POST /api/consultation
  bookConsultation: async (consultationData) => {
    const response = await api.post('/consultation', consultationData);
    return response.data;
  },

  // ADMIN: GET /api/consultation
  getAllConsultations: async () => {
    const response = await api.get('/consultation');
    return response.data;
  },

  // ADMIN: PUT /api/consultation/{id}
  updateConsultation: async (id, consultationData) => {
    const response = await api.put(`/consultation/${id}`, consultationData);
    return response.data;
  },

  // ADMIN: DELETE /api/consultation/{id}
  deleteConsultation: async (id) => {
    const response = await api.delete(`/consultation/${id}`);
    return response.data;
  },
};

export const projectRequestService = {
  // Public: POST /api/project-request
  submitProjectRequest: async (projectData) => {
    const response = await api.post('/project-request', projectData);
    return response.data;
  },

  // ADMIN: GET /api/project-request
  getAllProjectRequests: async () => {
    const response = await api.get('/project-request');
    return response.data;
  },

  // ADMIN: PUT /api/project-request/{id}
  updateProjectRequest: async (id, projectData) => {
    const response = await api.put(`/project-request/${id}`, projectData);
    return response.data;
  },

  // ADMIN: DELETE /api/project-request/{id}
  deleteProjectRequest: async (id) => {
    const response = await api.delete(`/project-request/${id}`);
    return response.data;
  },
};

export const careerService = {
  // Public: POST /api/career/apply (multipart/form-data)
  apply: async (formData) => {
    const response = await api.post('/career/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // ADMIN: GET /api/career
  getAllCareers: async () => {
    const response = await api.get('/career');
    return response.data;
  },

  // ADMIN: PUT /api/career/{id}
  updateCareer: async (id, careerData) => {
    const response = await api.put(`/career/${id}`, careerData);
    return response.data;
  },

  // ADMIN: DELETE /api/career/{id}
  deleteCareer: async (id) => {
    const response = await api.delete(`/career/${id}`);
    return response.data;
  },
};

export const servicesService = {
  // Public: GET /api/services
  getAllServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  // Public: GET /api/services/{id}
  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  // ADMIN: POST /api/services
  createService: async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  // ADMIN: PUT /api/services/{id}
  updateService: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  // ADMIN: DELETE /api/services/{id}
  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};

export const portfolioService = {
  // Public: GET /api/portfolio
  getAllPortfolio: async () => {
    const response = await api.get('/portfolio');
    return response.data;
  },

  // Public: GET /api/portfolio/{id}
  getPortfolioById: async (id) => {
    const response = await api.get(`/portfolio/${id}`);
    return response.data;
  },

  // ADMIN: POST /api/portfolio
  createPortfolio: async (portfolioData) => {
    const response = await api.post('/portfolio', portfolioData);
    return response.data;
  },

  // ADMIN: PUT /api/portfolio/{id}
  updatePortfolio: async (id, portfolioData) => {
    const response = await api.put(`/portfolio/${id}`, portfolioData);
    return response.data;
  },

  // ADMIN: DELETE /api/portfolio/{id}
  deletePortfolio: async (id) => {
    const response = await api.delete(`/portfolio/${id}`);
    return response.data;
  },
};

export const dashboardService = {
  // ADMIN: GET /api/admin/dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
};
