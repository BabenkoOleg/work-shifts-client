import { Snackbar } from 'buefy';

export const actionTypes = {
  SHOW: 'SHOW',
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  SHOW_WARNING: 'SHOW_WARNING',
  SHOW_ERROR: 'SHOW_ERROR',
};

export default {
  namespaced: true,

  actions: {
    [actionTypes.SHOW]({}, { message, type }) {
      Snackbar.open({
        duration: 3000,
        message,
        type,
        position: 'is-top',
        actionText: null,
        queue: false,
      });
    },

    [actionTypes.SHOW_SUCCESS]({ dispatch }, { message }) {
      dispatch(actionTypes.SHOW, { message, type: 'is-success' });
    },

    [actionTypes.SHOW_WARNING]({ dispatch }, { message }) {
      dispatch(actionTypes.SHOW, { message, type: 'is-warning' });
    },

    [actionTypes.SHOW_ERROR]({ dispatch }, { message }) {
      dispatch(actionTypes.SHOW, { message, type: 'is-danger' });
    },
  },
};
