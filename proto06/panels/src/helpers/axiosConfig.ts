import { APILink } from '@/store/configureStore';
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APILINK + "/api/v1/", // API base URL
  timeout: 0, // Set a reasonable timeout (30 seconds)
  // headers: { 'Content-Type': 'application/json' },
});

// Logout function: clears tokens and redirects to login
// const logout = () => {
//   Cookies.remove('access_token');
//   Cookies.remove('refresh_token');
//   // window.location.href = '/login'; // Redirect to login page
// };

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {

    const isSecure = import.meta.env.VITE_APP_STATUS != "development"
    let accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (accessToken) {
      // Attach access token to headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken) {
      // No access token but refresh token exists: attempt to refresh tokens
      try {
        const response = await axios.post(`${APILink}'/api/v1/refresh/`, { refresh: refreshToken });
        const { access, refresh } = response.data;

        // Update access token in the headers and cookies
        config.headers.Authorization = `Bearer ${access}`;
        Cookies.set('access_token', access, { expires: 6 / 24, secure: isSecure });
        Cookies.set('refresh_token', refresh, { expires: 6 / 24, secure: isSecure });
      } catch (error) {
        console.error('Error refreshing access token:', error);
        // If refresh fails, logout
        // logout();
      }
    } else {
      // If no tokens are found, logout
      console.log('No tokens found, logging out.');
      // logout();
    }

    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response data for debugging
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const isSecure = import.meta.env.VITE_APP_STATUS != "development"


    // If the error is a 401 (unauthorized), attempt to refresh the token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent looping

      try {
        const refreshToken = Cookies.get('refresh_token');

        if (refreshToken) {
          // Attempt to refresh tokens if refresh token is available
          const response = await axios.post(`${import.meta.env.VITE_APILINK}/api/v1/refresh/`, { refresh: refreshToken });
          const { access, refresh } = response.data;

          // Retry original request with new access token
          originalRequest.headers.Authorization = `Bearer ${access}`;

          if(access && refresh) {
            Cookies.set('access_token', access, { expires: 6 / 24, secure: isSecure });
            Cookies.set('refresh_token', refresh, { expires: 6 / 24, secure: isSecure });
          }

          // Retry the original request with new token
          return axios(originalRequest);
        }
      } catch (err) {
        console.error('Error refreshing token after 401:', err);
        // logout(); // Force logout if token refresh fails
        return Promise.reject(err);
      }
    }

    // If other errors or token refresh fails, reject the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
