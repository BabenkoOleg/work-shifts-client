<template>
  <div class="auth-form">
    <form @submit.prevent="resetPassword">
      <b-field>
        <b-input v-model="password"
                 placeholder="Password"
                 type="password"
                 icon="lock"
                 required>
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="passwordConfirmation"
                 placeholder="Password confirmation"
                 type="password"
                 icon="lock"
                 required>
        </b-input>
      </b-field>
      <b-field>
        <button class="button is-success is-fullwidth" :disabled="isButtonDisabled">
          Reset Password
        </button>
      </b-field>
    </form>
    <div class="auth-nav-link">
      <router-link :to="{ name: 'signIn' }">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      token: this.$route.query.token,
    };
  },

  computed: {
    isButtonDisabled() {
      return this.password === '' || this.passwordConfirmation === '';
    },
  },

  methods: {
    ...mapActions('auth', [authActionTypes.RESET_PASSWORD]),

    resetPassword() {
      this.$startLoading();
      this[authActionTypes.RESET_PASSWORD]({
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        token: this.token,
      }).then(() => {
        this.$stopLoading();
        this.$showSuccess('Password changed successfully!');
        this.$router.push({ name: 'dashboardPage' });
      }).catch((error) => {
        this.$stopLoading();
        this.$showError(error);
      });
    },
  },
};
</script>
