<template>
  <div class="auth-form">
    <form @submit.prevent="sendResetPasswordInstructions">
      <b-field>
        <b-input required v-model="email" placeholder="Email" :type="email" icon="email">
        </b-input>
      </b-field>
      <b-field>
        <button class="button is-success is-fullwidth">
          Send Instructions
        </button>
      </b-field>
    </form>
    <div class="auth-nav-link">
      <router-link :to="{ name: 'signIn' }">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { actionTypes as appActionTypes } from '@/store/modules/app';
import { actionTypes as snackbarActionTypes } from '@/store/modules/snackbar';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  data() {
    return {
      email: '',
    };
  },

  mounted() {
    if (this.rememberedEmail) {
      this.email = this.rememberedEmail;
      this.rememberMe = '1';
    }
  },

  computed: {
    ...mapState('auth', ['rememberedEmail']),
  },

  methods: {
    ...mapActions('app', [appActionTypes.START_LOADING, appActionTypes.STOP_LOADING]),
    ...mapActions('snackbar', [snackbarActionTypes.SHOW_SUCCESS, snackbarActionTypes.SHOW_ERROR]),
    ...mapActions('auth', [authActionTypes.SEND_RESET_PASSWORD_INSTRUCTIONS]),

    sendResetPasswordInstructions() {
      this[appActionTypes.START_LOADING]();
      this[authActionTypes.SEND_RESET_PASSWORD_INSTRUCTIONS]({
        email: this.email,
      }).then(({ data: { message } }) => {
        this[snackbarActionTypes.SHOW_SUCCESS]({ message });
        this.$router.push({ name: 'signIn' });
      }).catch((error) => {
        this[snackbarActionTypes.SHOW_ERROR]({ message: error.response.data.error });
      }).finally(() => {
        this[appActionTypes.STOP_LOADING]();
      });
    },
  },
};
</script>
