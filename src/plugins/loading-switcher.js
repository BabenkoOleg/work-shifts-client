import store from '../store';

export default {
  install(Vue) {
    Vue.prototype.$startLoading = () => {
      store.commit('app/SET_LOADING', true);
    };

    Vue.prototype.$stopLoading = () => {
      store.commit('app/SET_LOADING', false);
    };
  },
};
