import { actionTypes as authActionTypes } from '@/store/modules/auth';

export const actionTypes = {
  STOP_PRELOADING: 'STOP_PRELOADING',
};

export const mutationTypes = {
  SET_PRELOADING: 'SET_PRELOADING',
};

export default {
  namespaced: true,

  state: {
    preloading: true,
    preloadingError: null,
  },

  actions: {
    [actionTypes.STOP_PRELOADING]({ commit }) {
      commit(mutationTypes.SET_PRELOADING, false);
    },
  },

  mutations: {
    [mutationTypes.SET_PRELOADING](state, payload) {
      state.preloading = payload;
    },

    [mutationTypes.SET_PRELOADING_ERROR](state, payload) {
      state.preloadingError = payload;
    },
  },
};
