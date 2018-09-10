<template>
  <div class="auth-form">
    <form>
    <!-- <form @submit.prevent=""> -->
      <b-field>
        <b-input v-model="invitedUser.email" placeholder="Email" icon="email" disabled>
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="invitedUser.name" placeholder="Name" icon="account">
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="invitedUser.password"
                 placeholder="Password"
                 type="password"
                 icon="lock"
                 required>
        </b-input>
      </b-field>
      <b-field>
        <b-input v-model="invitedUser.passwordConfirmation"
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
      invitedUser: {
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  },

  computed: {
    isButtonDisabled() {
      return this.invitedUser.name === '' ||
             this.invitedUser.password === '' ||
             this.invitedUser.passwordConfirmation === '';
    },
  },

  mounted() {
    this.getInvitatedUser(this.$route.query.token);
  },

  methods: {
    ...mapActions('app', [appActionTypes.START_LOADING, appActionTypes.STOP_LOADING]),
    ...mapActions('snackbar', [snackbarActionTypes.SHOW_SUCCESS, snackbarActionTypes.SHOW_ERROR]),
    ...mapActions('auth', [authActionTypes.GET_INVITED_USER]),

    getInvitatedUser(token) {
      this[appActionTypes.START_LOADING]();
      this[authActionTypes.GET_INVITED_USER]({ token })
        .then((data) => {
          this.invitedUser.email = data.email;
          this.invitedUser.name = data.name;
          this[appActionTypes.STOP_LOADING]();
        }).catch((error) => {
          this[appActionTypes.STOP_LOADING]();
          error.errors.forEach(message => this[snackbarActionTypes.SHOW_ERROR]({ message }));
          this.$router.push({ name: 'signIn' });
        });
    },
  },
};
</script>
