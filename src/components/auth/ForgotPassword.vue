<template>
  <div class="auth-form">
    <form @submit.prevent="sendResetPasswordInstructions">
      <b-field>
        <b-input required v-model="email" placeholder="Email" icon="email">
        </b-input>
      </b-field>
      <b-field>
        <button class="button is-success is-fullwidth" :disabled="isButtonDisabled">
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
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  data() {
    return {
      email: '',
    };
  },

  computed: {
    ...mapState('auth', ['rememberedEmail']),

    isButtonDisabled() {
      return this.email === '';
    },
  },

  mounted() {
    if (this.rememberedEmail) this.email = this.rememberedEmail;
  },

  methods: {
    ...mapActions('auth', [authActionTypes.SEND_RESET_PASSWORD_INSTRUCTIONS]),

    sendResetPasswordInstructions() {
      this.$startLoading();
      this[authActionTypes.SEND_RESET_PASSWORD_INSTRUCTIONS]({
        email: this.email,
      }).then(() => {
        this.$stopLoading();
        this.$showSuccess('You will receive instructions in a few minutes');
        this.$router.push({ name: 'signIn' });
      }).catch((error) => {
        this.$stopLoading();
        this.$showError(error);
      });
    },
  },
};
</script>
