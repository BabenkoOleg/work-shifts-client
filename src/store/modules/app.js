export const actionTypes = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
};

export const mutationTypes = {
  SET_LOADING: 'SET_LOADING',
};

export default {
  namespaced: true,

  state: {
    isLoading: false,
  },

  actions: {
    [actionTypes.START_LOADING]({ commit }) {
      commit(mutationTypes.SET_LOADING, true);
    },

    [actionTypes.STOP_LOADING]({ commit }) {
      commit(mutationTypes.SET_LOADING, false);
    },
  },

  mutations: {
    [mutationTypes.SET_LOADING](state, payload) {
      state.isLoading = payload;
    },
  },
};
