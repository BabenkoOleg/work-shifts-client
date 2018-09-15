import Vue from 'vue';
import Buefy from 'buefy';
import Popup from './plugins/popup';

import App from './App.vue';

import router from './router';
import store from './store';

Vue.use(Buefy);
Vue.use(Popup);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
