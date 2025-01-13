import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://legible-freely-wren.ngrok-free.app/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  config.headers['ngrok-skip-browser-warning'] = 'true';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = escape('/');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
