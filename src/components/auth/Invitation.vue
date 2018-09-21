<template>
  <div class="auth-form">
    <form @submit.prevent="sendInvitationConfirmation">
      <b-field>
        <b-input v-model="user.email" placeholder="Email" icon="email" disabled></b-input>
      </b-field>
      <b-field>
        <b-input v-model="user.name" placeholder="Name" icon="account"></b-input>
      </b-field>
      <b-field>
        <b-input v-model="user.password"
                 placeholder="Password"
                 type="password"
                 icon="lock"
                 required>
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="user.passwordConfirmation"
                 placeholder="Password confirmation"
                 type="password"
                 icon="lock"
                 required>
        </b-input>
      </b-field>
      <b-field>
        <button class="button is-success is-fullwidth" :disabled="isButtonDisabled">
          Accept Invitation
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
      user: {
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  },

  computed: {
    isButtonDisabled() {
      return this.user.name === '' ||
             this.user.password === '' ||
             this.user.passwordConfirmation === '';
    },
  },

  mounted() {
    this.getInvitatedUser(this.$route.query.token);
  },

  methods: {
    ...mapActions('auth', [
      authActionTypes.SIGN_IN,
      authActionTypes.GET_INVITED_USER,
      authActionTypes.SEND_INVITATION_CONFIRMATION,
    ]),

    getInvitatedUser(token) {
      this.$startLoading();
      this[authActionTypes.GET_INVITED_USER]({ token })
        .then((data) => {
          this.user.email = data.email;
          this.user.name = data.name;
          this.$stopLoading();
        }).catch((error) => {
          this.$stopLoading();
          this.$showError(error);
          this.$router.push({ name: 'signIn' });
        });
    },

    sendInvitationConfirmation() {
      this.$startLoading();
      this[authActionTypes.SEND_INVITATION_CONFIRMATION]({ user: this.user })
        .then(() => {
          this.$stopLoading();
          this.$showSuccess('Password successfully set!');
          this.signIn();
        }).catch((error) => {
          this.$stopLoading();
          this.$showError(error);
        });
    },

    signIn() {
      this.$startLoading();
      this[authActionTypes.SIGN_IN]({
        email: this.user.email,
        password: this.user.password,
        rememberMe: false,
      }).then(() => {
        this.$stopLoading();
        this.$showSuccess('Signed in successfully!');
        this.$router.push({ name: 'dashboardPage' });
      }).catch((error) => {
        this.$stopLoading();
        this.$showError(error);
      });
    },
  },
};
</script>
