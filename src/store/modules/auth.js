import dataFormatter from '@/store/data-formatter';
import axiosInstance from '@/store/axios-instance';

export const endpoints = {
  SIGN_IN: '/auth/sign-in',
  SIGN_OUT: '/auth/sign-out',
  CURRENT_USER: '/auth/current-user',
  PASSWORD: '/auth/password',
};

export const actionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  SEND_RESET_PASSWORD_INSTRUCTIONS: 'SEND_RESET_PASSWORD_INSTRUCTIONS',
};

export const mutationTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER: 'CLEAR_CURRENT_USER',
  SET_REMEMBERED_EMAIL: 'SET_REMEMBERED_EMAIL',
  CLEAR_REMEMBERED_EMAIL: 'CLEAR_REMEMBERED_EMAIL',
};

export default {
  namespaced: true,

  state: {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    rememberedEmail: localStorage.getItem('rememberedEmail') || null,
  },

  actions: {
    [actionTypes.SIGN_IN]({ commit }, { email, password, rememberMe }) {
      return axiosInstance.post(endpoints.SIGN_IN, {
        user: {
          email, password, remember_me: rememberMe,
        },
      })
        .then(({ data }) => {
          const currentUser = dataFormatter.deserialize(data);
          commit(mutationTypes.SET_CURRENT_USER, currentUser);
          if (rememberMe === '1') {
            commit(mutationTypes.SET_REMEMBERED_EMAIL, email);
          } else {
            commit(mutationTypes.CLEAR_REMEMBERED_EMAIL);
          }
        });
    },

    [actionTypes.SIGN_OUT]({ commit }) {
      return axiosInstance.delete(endpoints.SIGN_OUT)
        .then(() => commit(mutationTypes.CLEAR_CURRENT_USER));
    },

    [actionTypes.GET_CURRENT_USER]({ commit }) {
      return axiosInstance.get(endpoints.CURRENT_USER)
        .then(({ data }) => {
          const currentUser = dataFormatter.deserialize(data);
          commit(mutationTypes.SET_CURRENT_USER, currentUser);
        })
        .catch((error) => {
          commit(mutationTypes.CLEAR_CURRENT_USER);
          return Promise.reject(error);
        });
    },

    [actionTypes.SEND_RESET_PASSWORD_INSTRUCTIONS]({}, { email }) {
      return axiosInstance.post(endpoints.PASSWORD, { user: { email } });
    },
  },

  mutations: {
    [mutationTypes.SET_CURRENT_USER](state, currentUser) {
      state.currentUser = currentUser;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    },

    [mutationTypes.CLEAR_CURRENT_USER](state) {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },

    [mutationTypes.SET_REMEMBERED_EMAIL](state, rememberedEmail) {
      state.rememberedEmail = rememberedEmail;
      localStorage.setItem('rememberedEmail', rememberedEmail);
    },

    [mutationTypes.CLEAR_REMEMBERED_EMAIL](state) {
      state.rememberedEmail = null;
      localStorage.removeItem('rememberedEmail');
    },
  },
};
