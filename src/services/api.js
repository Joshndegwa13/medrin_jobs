import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  googleAuth: (token) => api.post("/auth/google", { token }),
  verifyEmail: (token) => api.post("/auth/verify-email", { token }),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/auth/reset-password", { token, password }),
};

// Jobs endpoints
export const jobs = {
  getAll: (filters) => api.get("/jobs", { params: filters }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (jobData) => api.post("/jobs", jobData),
  update: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  delete: (id) => api.delete(`/jobs/${id}`),
  apply: (jobId, application) => api.post(`/jobs/${jobId}/apply`, application),
};

// Applications endpoints
export const applications = {
  getByJob: (jobId) => api.get(`/jobs/${jobId}/applications`),
  updateStatus: (jobId, applicationId, status) =>
    api.put(`/jobs/${jobId}/applications/${applicationId}`, { status }),
};

// Organisation endpoints
export const organisation = {
  getDashboardStats: () => api.get("/organisation/stats"),
  getApplications: (status) =>
    api.get("/organisation/applications", { params: { status } }),
};

// Subscription/Payment endpoints
export const payments = {
  createSubscription: (planId) =>
    api.post("/payments/create-subscription", { planId }),
  getPlans: () => api.get("/payments/plans"),
  webhook: (data) => api.post("/payments/webhook", data),
};

export default api;
