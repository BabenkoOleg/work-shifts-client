import axiosInstance from '../axios-instance';

export const endpoints = {
  SIGN_IN: '/auth/sign-in',
};

export const actionTypes = {
  SIGN_IN: 'SIGN_IN',
};

export const mutationTypes = {
};

export default {
  namespaced: true,

  state: {
    currentUser: null,
    jwt: window.localStorage.getItem('jwt'),
  },

  getters: {
    jwt: state => state.jwt,
  },

  actions: {
    [actionTypes.SIGN_IN]({ commit }, { email, password }) {
      return axiosInstance.post(endpoints.SIGN_IN, { user: { email, password } })
        .then(({ data: { jwt } }) => {
          commit(mutationTypes.SET_JWT, jwt);
        });
    },
  },

  mutations: {
  },
};
