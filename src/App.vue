<template>
  <div id="app">
    <app-header v-if="currentUser"></app-header>
    <div class="main-container">
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  computed: {
    ...mapState('app', ['isLoading']),
    ...mapState('auth', ['currentUser']),
  },

  components: {
    AppHeader,
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
            this.$router.push({ name: 'dashboardPage' });
          }
        })
        .catch(() => {
          const routes = ['signIn', 'forgotPassword', 'resetPassword', 'invitation'];
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
  background-color: #f7f9fb;

  .main-container {
    height: 100%;
    padding-top: 53px;

    .content-wrapper {
      height: 100%;
      padding: 32px 22px;
      overflow: scroll;
    }
  }

  &.auth {
    background-color: #1f1f1f;

    .main-container {
      height: 100%;
      padding-top: 0;

      .content-wrapper {
        height: 100%;
        overflow: unset;
      }
    }

    .loading-overlay {
      .loading-background {
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }

  .field {
    .help.is-danger {
      display: none;
    }
  }
}

.notices {
  .snackbar {
    font-size: 0.95em;
    font-weight: bold;
    line-height: 1em;

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

@media (max-width: 1024px) {
  .notices {
    .snackbar {
      min-height: 52px;
    }
  }
}

@media (max-width: 767px) {
  body:not(.auth) {
    .main-container {
      .content-wrapper {
        height: 100%;
        padding: 0;
        overflow: scroll;
      }
    }

  }
}
</style>
