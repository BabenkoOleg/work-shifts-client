import axios from 'axios';
import dataFormatter from '@/store/data-formatter';
import { Snackbar } from 'buefy';

const axiosInstance = axios.create({
  baseURL: '/api/',
});

axiosInstance.interceptors.response.use((response) => {
  return Promise.revolve(dataFormatter.deserialize(response.data));
}, (error) => {
  if (error.response.status < 500) {
    return Promise.reject(dataFormatter.deserialize(error.response.data));
  } else {
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

    error.response.data = {
      error: `${error.response.statusText} [${error.response.status}]`,
    };
  }

  return Promise.reject(error);
});

export default axiosInstance;
