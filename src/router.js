import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';

import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  store.state.auth.currentUser ? next({ name: 'home' }) : next();
};

const ifAuthenticated = (to, from, next) => {
  store.state.auth.currentUser ? next() : next({ name: 'signIn' });
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
