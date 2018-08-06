import axios from 'axios';
import { Snackbar } from 'buefy';

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

axiosInstance.interceptors.response.use(() => {}, (error) => {
  if (error.response.status >= 500) {
    let errorMessage;

    if (process.env.NODE_ENV === 'production') {
      errorMessage = 'Something went wrong, but we are already fixing it!';
    } else {
      errorMessage = `Server error: ${error.response.statusText} [${error.response.status}]`;
    }

    Snackbar.open({
      duration: 5000,
      message: errorMessage,
      type: 'is-danger',
      position: 'is-bottom',
      actionText: 'Ok',
      queue: false,
    });
  }
});

export default axiosInstance;
