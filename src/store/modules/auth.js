import axiosInstance from '../axios-instance';

export const actionTypes = {
  LOGIN: 'LOGIN',
};

export const mutationTypes = {
  SET_JWT: 'SET_JWT',
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
    // login
    [actionTypes.LOGIN]({ commit }, { email, password }) {
      axiosInstance.post('/sign-in', { email, password })
        .then(({ data: { jwt } }) => {
          commit(mutationTypes.SET_JWT, jwt);
        });
    },
  },

  mutations: {
    // set jwt
    [mutationTypes.SET_JWT](state, jwt) {
      window.localStorage.setItem('jwt', jwt);
      state.jwt = jwt;
    },
  },
};
