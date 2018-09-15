export const mutationTypes = {
  SET_LOADING: 'SET_LOADING',
};

export default {
  namespaced: true,

  state: {
    isLoading: false,
  },

  mutations: {
    [mutationTypes.SET_LOADING](state, payload) {
      state.isLoading = payload;
    },
  },
};
