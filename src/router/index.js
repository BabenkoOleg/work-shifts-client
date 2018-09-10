import Vue from 'vue';
import Router from 'vue-router';

import AuthPage from '@/pages/AuthPage.vue';
import DashboardPage from '@/pages/DashboardPage.vue';

import SignIn from '@/components/auth/SignIn.vue';
import ForgotPassword from '@/components/auth/ForgotPassword.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';

import store from '../store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  store.state.auth.currentUser ? next({ name: 'dashboardPage' }) : next();
};

const ifAuthenticated = (to, from, next) => {
  store.state.auth.currentUser ? next() : next({ name: 'signIn' });
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboardPage',
      component: DashboardPage,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '',
      name: 'authPage',
      component: AuthPage,
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
