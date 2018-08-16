<template>
  <div class="home">
    <div v-if="currentUser" class="hello">
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          Hello, {{ currentUser.name }}!
        </div>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <button class="button is-success" @click="toAdminPanel">Admin Panel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  name: 'home',

  computed: {
    ...mapState('auth', ['currentUser']),
  },

  methods: {
    // ToDo: remove it
    toAdminPanel() {
      window.location.pathname = '/admin';
    },
  },
};
</script>

<style lang="scss" scoped>
.hello {
  margin-top: 120px;
  text-align: center;
}
</style>
