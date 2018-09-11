<template>
  <div class="auth-form">
    <form @submit.prevent="sendInvitationConfirmation">
      <b-field>
        <b-input v-model="user.email" placeholder="Email" icon="email" disabled>
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="user.name" placeholder="Name" icon="account">
        </b-input>
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
import { actionTypes as appActionTypes } from '@/store/modules/app';
import { actionTypes as snackbarActionTypes } from '@/store/modules/snackbar';
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
    ...mapActions('app', [appActionTypes.START_LOADING, appActionTypes.STOP_LOADING]),
    ...mapActions('snackbar', [snackbarActionTypes.SHOW_SUCCESS, snackbarActionTypes.SHOW_ERRORS]),
    ...mapActions('auth', [
      authActionTypes.GET_INVITED_USER,
      authActionTypes.SEND_INVITATION_CONFIRMATION,
    ]),

    getInvitatedUser(token) {
      this[appActionTypes.START_LOADING]();
      this[authActionTypes.GET_INVITED_USER]({ token })
        .then((data) => {
          this.user.email = data.email;
          this.user.name = data.name;
          this[appActionTypes.STOP_LOADING]();
        }).catch((error) => {
          this[appActionTypes.STOP_LOADING]();
          this[snackbarActionTypes.SHOW_ERRORS]({ messages: error.errors });
          this.$router.push({ name: 'signIn' });
        });
    },

    sendInvitationConfirmation() {
      this[appActionTypes.START_LOADING]();
      this[authActionTypes.SEND_INVITATION_CONFIRMATION]({ user: this.user })
        .then(() => {
          this[appActionTypes.STOP_LOADING]();
          this[snackbarActionTypes.SHOW_SUCCESS]({ message: 'Password successfully set' });
          this.$router.push({ name: 'dashboardPage' });
        }).catch((error) => {
          this[appActionTypes.STOP_LOADING]();
          this[snackbarActionTypes.SHOW_ERRORS]({ messages: error.errors });
        });
    }
  },
};
</script>
