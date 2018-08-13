<template>
  <div id="app">
    <router-view/>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  computed: {
    ...mapState('app', ['isLoading']),
    ...mapState('auth', ['currentUser']),
  },

  mounted() {
    document.body.classList.remove('preloading');
    this.checkCurrentUser();
  },

  methods: {
    ...mapActions('auth', [authActionTypes.GET_CURRENT_USER]),

    checkCurrentUser() {
      this[authActionTypes.GET_CURRENT_USER]()
        .then(() => {
          if (this.$router.currentRoute.name === 'signIn') {
            this.$router.push({ name: 'home' });
          }
        })
        .catch(() => {
          const routes = ['signIn', 'forgotPassword', 'resetPassword'];
          if (!routes.includes(this.$router.currentRoute.name)) {
            this.$router.push({ name: 'signIn' });
          }
        });
    },
  },
};
</script>

<style lang="scss">

@import "~bulma/sass/utilities/_all";

// Set your colors
$success: #3ab54a;
$success-invert: findColorInvert($success);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

html,
body,
#app {
  height: 100%;
}

body {
  &.auth {
    background-color: #1f1f1f;

    .loading-overlay {
      .loading-background {
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }
}

.notices {
  .snackbar {
    font-size: 0.95em;
    font-weight: bold;
    line-height: 1em;
    min-height: 2.5em;

    &.is-success {
      background: #3ab54a;
      border: 2px solid #39a748;
    }

    &.is-danger {
      background: #ff170f;
      border: 2px solid #bf0b00;
    }

    .text {
      text-align: center;
    }
  }
}
</style>
