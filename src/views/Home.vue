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
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <button class="button is-danger" @click="signOut">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  name: 'home',

  computed: {
    ...mapState('auth', ['currentUser']),
  },

  methods: {
    ...mapActions('auth', [authActionTypes.SIGN_OUT]),

    // ToDo: remove it
    toAdminPanel() {
      window.location.pathname = '/admin';
    },

    signOut() {
      this[authActionTypes.SIGN_OUT]().then(() => {
        this.$router.push({ name: 'signIn' });
      });
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
