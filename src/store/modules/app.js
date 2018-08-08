import { actionTypes as authActionTypes } from '@/store/modules/auth';
import { actionTypes as businessActionTypes } from '@/store/modules/business';

export const actionTypes = {
  GET_INIT_DATA: 'GET_INIT_DATA',
  STOP_PRELOADING: 'STOP_PRELOADING',
};

export const mutationTypes = {
  SET_PRELOADING: 'SET_PRELOADING',
  SET_PRELOADING_ERROR: 'SET_PRELOADING_ERROR',
};

export default {
  namespaced: true,

  state: {
    preloading: true,
    preloadingError: null,
  },

  actions: {
    [actionTypes.GET_INIT_DATA]({ commit, dispatch }) {
      dispatch(`business/${businessActionTypes.GET_CURRENT_BUSINESS}`, {}, { root: true })
        .then(() => {
          dispatch(`auth/${authActionTypes.GET_CURRENT_USER}`, {}, { root: true })
            .finally(() => {
              commit(mutationTypes.SET_PRELOADING, false);
            });
        })
        .catch((error) => {
          console.log(error);
          commit(mutationTypes.SET_PRELOADING_ERROR, error);
          commit(mutationTypes.SET_PRELOADING, false);
        });
    },

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
