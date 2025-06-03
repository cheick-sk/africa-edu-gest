import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'; // Assurez-vous que localhost:3001 est le port du backend

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tenant/University Onboarding
export const onboardUniversity = async (data: any) => {
  try {
    const response = await apiClient.post('/tenants/onboarding', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An unknown error occurred during onboarding.' };
  }
};

// Auth
export const signInUser = async (credentials: any) => {
  try {
    // Note: The backend auth service needs a login endpoint that takes email, password, and potentially universityId/subdomain
    // For simplicity, we'll assume a general login endpoint first.
    // This will need to be adapted to how the backend expects login requests for specific tenants.
    // A common pattern is to login to a "central" auth, or provide tenant identifier (subdomain/custom domain)
    // to route to the correct user pool if users are strictly partitioned by tenant at login.
    // For now, let's assume a /auth/login endpoint that returns a token for a user *within* a tenant.
    // The backend's AuthService.login expects a user object. It should be preceded by a validation step.
    // We need an actual /auth/login endpoint in the backend.
    // For now, this is a placeholder.
    // const response = await apiClient.post('/auth/login', credentials);
    // return response.data;
    console.warn("signInUser needs a proper backend /auth/login endpoint. This is a placeholder.");
    // Simulate login if backend endpoint is not ready
    if (credentials.email === "admin@uconakry.com" && credentials.password === "strongPassword123") {
        return { access_token: "fake_jwt_token_for_testing", user: { id: "user-uuid", email: "admin@uconakry.com", universityId: "tenant-uuid-uconakry" } };
    }
    throw { message: "Invalid credentials (mock)" };
  } catch (error: any) {
    throw error.response?.data || { message: 'An unknown error occurred during sign in.' };
  }
};


export default apiClient;
