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
      <b-notification v-if="invalid" type="is-danger" :closable="false">
        Email/Password is incorrect
      </b-notification>
      <b-field>
        <button class="button is-success is-fullwidth">
          Sign In
        </button>
      </b-field>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  data() {
    return {
      showSiteName: false,
      email: '',
      password: '',
      invalid: false,
    };
  },

  created() {
    document.body.classList.add('sign-in');
  },

  mounted() {
    this.showSiteName = true;
  },

  destroyed() {
    document.body.classList.remove('sign-in');
  },

  methods: {
    ...mapActions('auth', [authActionTypes.SIGN_IN]),

    signIn() {
      this[authActionTypes.SIGN_IN]({
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$toast.open({
          message: 'Signed in successfully',
          type: 'is-success',
        });
        this.$router.push('/');
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
    margin-bottom: 10px;
    text-align: center;
  }

  /deep/ .notification {
    margin-bottom: 12px;
    padding: 1rem 1.25rem 1rem 1.25rem;

    .media {
      text-align: center;

      .media-content {
        font-size: 1rem;
        text-align: center;
      }
    }
  }
}
</style>
