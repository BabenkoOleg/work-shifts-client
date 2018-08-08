import dataFormatter from '@/store/data-formatter';
import axiosInstance from '@/store/axios-instance';

export const endpoints = {
  BUSINESS: '/business',
};

export const actionTypes = {
  GET_CURRENT_BUSINESS: 'GET_CURRENT_BUSINESS',
};

export const mutationTypes = {
  SET_CURRENT_BUSINESS: 'SET_CURRENT_BUSINESS',
};

export default {
  namespaced: true,

  state: {
    currentBusiness: null,
  },

  actions: {
    [actionTypes.GET_CURRENT_BUSINESS]({ commit }) {
      return axiosInstance.get(endpoints.BUSINESS)
        .then(({ data }) => {
          const currentBusiness = dataFormatter.deserialize(data);
          commit(mutationTypes.SET_CURRENT_BUSINESS, currentBusiness);
        })
        .catch(error => Promise.reject(error.response.data.error));
    },
  },

  mutations: {
    [mutationTypes.SET_CURRENT_BUSINESS](state, currentBusiness) {
      state.currentBusiness = currentBusiness;
    },
  },
};
