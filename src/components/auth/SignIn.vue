<template>
  <div class="sign-in">
    <form @submit.prevent="signIn">
      <b-field>
        <b-input required v-model="email" placeholder="Email" :type="email" icon="email">
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="password" placeholder="Password" type="password" icon="lock" required>
        </b-input>
      </b-field>
      <b-checkbox v-model="rememberMe"
                  class="remember-me"
                  size="is-small"
                  type="is-success"
                  true-value="1"
                  false-value="0">
        Remember me
      </b-checkbox>
      <b-field>
        <button class="button is-success is-fullwidth">
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
      invalid: false,
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
    ...mapActions('auth', [authActionTypes.SIGN_IN]),

    signIn() {
      this[authActionTypes.SIGN_IN]({
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      }).then(() => {
        this.$toast.open({
          message: 'Signed in successfully',
          type: 'is-success',
        });
        this.$router.push({ name: 'home' });
      }).catch((error) => {
        this.$toast.open({
          message: error.response.data.error,
          type: 'is-danger',
        });
        this.password = '';
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in {
  /deep/ .remember-me {
    margin-bottom: 15px;

    .control-label {
      color: #b5b5b5;
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>
