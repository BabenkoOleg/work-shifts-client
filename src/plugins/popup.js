import { Snackbar } from 'buefy';

export default {
  install(Vue) {
    Vue.prototype.$openSnackbar = (type, message) => {
      Snackbar.open({
        duration: 3000,
        message,
        type,
        position: 'is-top',
        actionText: null,
        queue: false,
      });
    };

    Vue.prototype.$showPopup = (type, subject) => {
      if (process.env.NODE_ENV === 'development' && subject.name && subject.message) {
        Vue.prototype.$openSnackbar(type, `${subject.name}: ${subject.message}`);
      } else if (Array.isArray(subject)) {
        subject.forEach(message => Vue.prototype.$openSnackbar(type, message));
      } else if (Array.isArray(subject.messages)) {
        subject.messages.forEach(message => Vue.prototype.$openSnackbar(type, message));
      } else if (Array.isArray(subject.errors)) {
        subject.errors.forEach(error => Vue.prototype.$openSnackbar(type, error));
      } else {
        Vue.prototype.$openSnackbar(type, subject);
      }
    };

    Vue.prototype.$showSuccess = (message) => {
      Vue.prototype.$showPopup('is-success', message);
    };

    Vue.prototype.$showWarning = (message) => {
      Vue.prototype.$showPopup('is-warning', message);
    };

    Vue.prototype.$showError = (error) => {
      Vue.prototype.$showPopup('is-danger', error);
    };
  },
};
