<template>
  <div class="header">
    <nav class="navbar">
      <div class="navbar-menu">
        <div class="navbar-end">
          <b-dropdown position="is-bottom-left">
            <a class="navbar-item" slot="trigger">
              <span class="user-name">{{currentUser.name || currentUser.email}}</span>
              <b-icon icon="account"></b-icon>
            </a>
            <b-dropdown-item v-if="currentUser.role === 'administrator'" @click="goToAdminPanel">
              <b-icon icon="account-settings-variant"></b-icon>
              <span class="dropdown-item-label">Admin Panel</span>
            </b-dropdown-item>
            <hr class="dropdown-divider">
            <b-dropdown-item disabled>
              <b-icon icon="settings"></b-icon>
              <span class="dropdown-item-label">Settings</span>
            </b-dropdown-item>
            <b-dropdown-item @click="signOut">
              <b-icon icon="logout"></b-icon>
              <span class="dropdown-item-label">Sign Out</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  computed: {
    ...mapState('auth', ['currentUser']),
  },

  methods: {
    ...mapActions('auth', [authActionTypes.SIGN_OUT]),

    signOut() {
      this[authActionTypes.SIGN_OUT]().then(() => {
        this.$router.push({ name: 'signIn' });
      });
    },

    goToAdminPanel() {
      window.location.pathname = '/admin';
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  .navbar {
    background-color: #3d4852;
    padding-right: 10px;

    .navbar-item {
      background-color: #3d4852;
      color: #fff;

      .user-name {
        margin-right: 10px;
      }

      &:hover {
        background-color: #4e5d69;
      }
    }

    .dropdown-menu {
      .dropdown-item {
        display: flex;

        .dropdown-item-label {
          line-height: 24px;
        }

        .icon {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
