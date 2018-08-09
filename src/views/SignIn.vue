<template>
  <div class="sign-in">
    <form class="sign-in" @submit.prevent="signIn">
      <transition name="fade">
        <h3 v-if="showSiteName" class="subtitle">Work Shifts</h3>
      </transition>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  data() {
    return {
      showSiteName: false,
      email: '',
      password: '',
      rememberMe: 0,
      invalid: false,
    };
  },

  created() {
    document.body.classList.add('sign-in');
  },

  mounted() {
    this.showSiteName = true;
    if (this.rememberedEmail) {
      this.email = this.rememberedEmail;
      this.rememberMe = 1;
    }
  },

  destroyed() {
    document.body.classList.remove('sign-in');
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
