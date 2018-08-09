<template>
  <div id="app">
    <div id="app" :class="{ 'app-preloading': preloading }">
      <div class="app-preloader" v-if="preloading">
        <app-preloader></app-preloader>
      </div>
      <template v-else>
        <router-view/>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';
import AppPreloader from '@/components/AppPreloader.vue';

export default {
  data() {
    return {
      preloading: true,
    };
  },

  components: {
    AppPreloader,
  },

  computed: {
    ...mapState('auth', ['currentUser']),
  },

  mounted() {
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
          this.$router.push({ name: 'signIn' });
        })
        .finally(() => {
          this.preloading = false;
        });
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
  &.sign-in {
    background-color: #1f1f1f;
  }
}

#app {
  &.app-preloading {
    background: #1f1f1f;

    .app-error,
    .app-preloader {
      position: absolute;
      left: 50%;
      transform: translate(-50%, calc(-50% - 25px));
      top: 50%;
    }

    .app-error {
      color: #c3c3c3;
      font-size: 35px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
</style>
