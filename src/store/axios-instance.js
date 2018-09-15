import axios from 'axios';
import dataFormatter from '@/store/data-formatter';
import { Snackbar } from 'buefy';

const axiosInstance = axios.create({
  baseURL: '/api/',
});

const onFulfilled = (response) => {
  if (response.data) return Promise.resolve(dataFormatter.deserialize(response.data));
  return null;
};

const onRejected = (error) => {
  if (error.response.status < 500) {
    if (error.response.data) return Promise.reject(dataFormatter.deserialize(error.response.data));
    return null;
  }

  let errorMessage = null;

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

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(onFulfilled, onRejected);

export default axiosInstance;
