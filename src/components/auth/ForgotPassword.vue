<template>
  <div class="forgot-password">
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
    ...mapActions('auth', [authActionTypes.SEND_RESET_PASSWORD_INSTRUCTIONS]),

    sendResetPasswordInstructions() {
      this[authActionTypes.SEND_RESET_PASSWORD_INSTRUCTIONS]({ email: this.email })
        .then(({ data: { message } }) => {
          this.$toast.open({
            message: message,
            type: 'is-success',
            duration: 50000,
          });
          this.$router.push({ name: 'signIn' });
        })
        .catch((error) => {
          this.$toast.open({
            message: error.response.data.error,
            type: 'is-danger',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.sign-in {
  left: 50%;
  max-width: 400px;
  padding: 30px;
  position: absolute;
  transform: translate(-50%, calc(-50% - 10px));
  top: 50%;
  width: 100%;

  .subtitle {
    color: #fff;
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
  }

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
