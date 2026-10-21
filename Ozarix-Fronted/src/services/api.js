import axios from "axios";

// Create an Axios instance with a dynamic baseURL based on Vite environment variables.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to automatically attach the authentication token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem("ozarix_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors (e.g., unauthorized access)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle Unauthorized error (e.g. redirect to login, clear local storage)
        console.warn("Unauthorized access - clearing user session...");
        localStorage.removeItem("ozarix_user");
        // Optionally trigger a page reload or route redirect if needed
      }
    }
    return Promise.reject(error);
  }
);

export default api;
