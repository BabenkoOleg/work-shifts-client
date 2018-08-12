<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  computed: {
    ...mapState('auth', ['currentUser']),
  },

  mounted() {
    document.body.classList.remove('preloading');
    // this.checkCurrentUser();
  },

  methods: {
    ...mapActions('auth', [authActionTypes.GET_CURRENT_USER]),

    checkCurrentUser() {
      this[authActionTypes.GET_CURRENT_USER]()
        .then(() => {
          if (this.$router.currentRoute.name === 'signIn') {
            this.$router.push({ name: 'home' });
          }
        });
        // .catch(() => this.$router.push({ name: 'signIn' }));
    },
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}

body {
  &.auth {
    background-color: #1f1f1f;
  }
}
</style>
