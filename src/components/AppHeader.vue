<template>
  <div class="header">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item navbar-item-logo" :to="{ name: 'home' }">
          WorkShifts | {{currentUser.business.name}}
        </router-link>
        <a role="button"
           class="navbar-burger"
           :class="{ 'is-active': isMenuActive }"
           aria-label="menu"
           aria-expanded="false"
           @click="toggleMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
        <div class="navbar-end">
          <div class="navbar-item user-name">
            <span class="navbar-item-label">{{currentUser.name || currentUser.email}}</span>
            <b-icon icon="account"></b-icon>
          </div>
          <hr>
          <div class="navbar-item">
            <span class="navbar-item-label">Admin Panel</span>
            <b-icon icon="account-settings-variant"></b-icon>
          </div>
          <div class="navbar-item">
            <span class="navbar-item-label">Settings</span>
            <b-icon icon="settings"></b-icon>
          </div>
          <div class="navbar-item">
            <span class="navbar-item-label">Sign Out</span>
            <b-icon icon="logout"></b-icon>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  data() {
    return {
      isMenuActive: false,
    };
  },

  computed: {
    ...mapState('auth', ['currentUser']),
  },

  methods: {
    ...mapActions('auth', [authActionTypes.SIGN_OUT]),

    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },

    signOut() {
      this[authActionTypes.SIGN_OUT]().then(() => {
        this.$router.push({ name: 'signIn' });
      });
    },

    goToAdminPanel() {
      window.location.pathname = '/admin';
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;

  .navbar {
    background-color: #3d4852;
    padding-left: 10px;
    padding-right: 10px;

    .navbar-brand {
      .navbar-item-logo {
        color: #dedede;
        font-size: 18px;

        &:hover {
          color: #fff;
          cursor: pointer;
        }
      }

      .navbar-burger {
        color: #dedede;
      }
    }

    .navbar-menu {
      .navbar-end {
        .navbar-item {
          background-color: #3d4852;
          color: #dedede;
          display: flex;
          font-size: 14px;

          &:hover:not(.user-name) {
            background-color: #343a40;
            color: #fff;
            cursor: pointer;
          }

          hr {
            display: none;
          }

          .navbar-item-label {
            line-height: 24px;
          }

          .icon {
            margin-left: 8px;
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .header {
    .navbar {
      background-color: #3d4852;
      padding-left: 0;
      padding-right: 0;

      .navbar-brand {
        .navbar-item {
          &.navbar-item-logo {
            font-size: 16px;
            padding: 10px 16px;
          }
        }
      }

      .navbar-menu {
        .navbar-end {
          .navbar-item {
            background-color: #fff;
            color: #484848;
            flex-direction: row-reverse;
            font-size: 16px;
            justify-content: flex-end;
            padding: 10px 16px;

            .icon {
              margin-left: 0;
              margin-right: 8px;
            }
          }

          hr {
            display: inherit;
            margin: 8px;
          }
        }
      }
    }
  }
}
</style>
