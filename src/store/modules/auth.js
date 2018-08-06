import dataFormatter from '@/store/data-formatter';
import axiosInstance from '@/store/axios-instance';

export const endpoints = {
  SIGN_IN: '/auth/sign-in',
  SIGN_OUT: '/auth/sign-out',
  CURRENT_USER: '/auth/current-user',
};

export const actionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
};

export const mutationTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

export default {
  namespaced: true,

  state: {
    currentUser: null,
  },

  getters: {
    currentUser: state => state.currentUser,
  },

  actions: {
    [actionTypes.SIGN_IN]({ commit }, { email, password }) {
      return axiosInstance.post(endpoints.SIGN_IN, { user: { email, password } })
        .then(({ data }) => {
          const currentUser = dataFormatter.deserialize(data);
          commit(mutationTypes.SET_CURRENT_USER, currentUser);
        });
    },

    [actionTypes.SIGN_OUT]({ commit }) {
      return axiosInstance.delete(endpoints.SIGN_OUT)
        .then(() => commit(mutationTypes.SET_CURRENT_USER, null));
    },

    [actionTypes.GET_CURRENT_USER]({ commit }) {
      return axiosInstance.get(endpoints.CURRENT_USER)
        .then(({ data }) => {
          const currentUser = dataFormatter.deserialize(data);
          commit(mutationTypes.SET_CURRENT_USER, currentUser);
        });
    },
  },

  mutations: {
    [mutationTypes.SET_CURRENT_USER](state, currentUser) {
      state.currentUser = currentUser;
    },
  },
};
