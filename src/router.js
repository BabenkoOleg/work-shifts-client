import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';

import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.auth.authorized) {
    next();
  } else {
    next({ name: 'home' });
  }
};

const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.authorized) {
    next();
  } else {
    next({ name: 'signIn' });
  }
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      beforeEnter: ifNotAuthenticated,
    },
  ],
});
