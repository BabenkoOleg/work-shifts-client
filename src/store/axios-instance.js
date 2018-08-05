import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/',
});

axiosInstance.interceptors.request.use((config) => {
  const jwt = window.localStorage.getItem('jwt');
  if (jwt) {
    config.headers['Http-Authorization'] = `Bearer ${jwt}`;
  }
  return config;
});

export default axiosInstance;
