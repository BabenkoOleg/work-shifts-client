import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';

import Auth from '@/views/Auth.vue';
import SignIn from '@/components/auth/SignIn.vue';
import ForgotPassword from '@/components/auth/ForgotPassword.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';

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
      path: '',
      name: 'auth',
      component: Auth,
      beforeEnter: ifNotAuthenticated,
      children: [
        {
          path: '/sign-in',
          name: 'signIn',
          component: SignIn,
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword,
        },
        {
          path: '/reset-password',
          name: 'resetPassword',
          component: ResetPassword,
        },
      ],
    },
  ],
});
