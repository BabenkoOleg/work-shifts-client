<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  mounted() {
    this[authActionTypes.GET_CURRENT_USER]();
  },

  methods: {
    ...mapActions('auth', [authActionTypes.GET_CURRENT_USER]),
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

body {
  &.sign-in {
    background-color: #242424;
  }
}
</style>
