import axios from 'axios';
import { authStorage } from './auth';

// 🔧 Backend base URL – apne port ke hisaab se set karo
// Example: http://localhost:5240/api  OR  https://localhost:7040/api
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5240/api';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

// ✅ Har request pe JWT token header set
apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Agar token expire / invalid ho → auto logout + redirect to /login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = String(error?.config?.url ?? '');

    // ✅ Don't hard-redirect on login/register failures
    const isAuthEndpoint =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/login') ||
      url.includes('/register');

    const hasToken = !!authStorage.getToken();

    // ✅ Only auto-logout when user WAS logged in and gets 401 on protected calls
    if (status === 401 && hasToken && !isAuthEndpoint) {
      authStorage.clear();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
