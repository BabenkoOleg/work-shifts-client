<template>
  <div class="auth-form">
    <form @submit.prevent="signIn">
      <b-field>
        <b-input v-model="email" placeholder="Email" icon="email" required>
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="password" placeholder="Password" type="password" icon="lock" required>
        </b-input>
      </b-field>
      <div class="remember-me-field">
        <b-checkbox v-model="rememberMe"
                    class="remember-me"
                    size="is-small"
                    type="is-success"
                    true-value="1"
                    false-value="0">
          Remember me
        </b-checkbox>
      </div>
      <b-field>
        <button class="button is-success is-fullwidth" :disabled="isButtonDisabled">
          Sign In
        </button>
      </b-field>
    </form>
    <div class="auth-nav-link">
      <router-link :to="{ name: 'forgotPassword' }">Forgot password?</router-link>
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
      password: '',
      rememberMe: '0',
    };
  },

  computed: {
    ...mapState('auth', ['rememberedEmail']),

    isButtonDisabled() {
      return this.email === '' || this.password === '';
    },
  },

  mounted() {
    if (this.rememberedEmail) {
      this.email = this.rememberedEmail;
      this.rememberMe = '1';
    }
  },

  methods: {
    ...mapActions('auth', [authActionTypes.SIGN_IN]),

    signIn() {
      this.$startLoading();
      this[authActionTypes.SIGN_IN]({
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      }).then(() => {
        this.$stopLoading();
        this.$showSuccess('Signed in successfully!');
        this.$router.push({ name: 'dashboardPage' });
      }).catch((error) => {
        this.$stopLoading();
        this.$showError(error.messages);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.remember-me-field {
  margin-bottom: 15px;

  /deep/ .remember-me {
    &:hover .control-label {
      color: #e2e2e2;
    }

    .control-label {
      color: #b5b5b5;
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>
