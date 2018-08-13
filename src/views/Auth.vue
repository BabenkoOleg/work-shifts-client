<template>
  <div class="auth-container">
    <transition name="fade">
      <h3 v-if="showSiteName" class="site-name">Work Shifts</h3>
    </transition>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSiteName: false,
    };
  },

  created() {
    document.body.classList.add('auth');
  },

  mounted() {
    this.showSiteName = true;
  },

  destroyed() {
    document.body.classList.remove('auth');
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.auth-container {
  left: 50%;
  max-width: 400px;
  padding: 30px;
  position: absolute;
  transform: translate(-50%, calc(-50% - 20px));
  top: 50%;
  width: 100%;

  .site-name {
    color: #fff;
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
  }

  /deep/ .auth-form {
    .auth-nav-link {
      margin-top: 10px;
      text-align: center;

      a {
        color: #b5b5b5;
        font-size: 15px;
        line-height: 15px;

        &:hover {
          color: #e2e2e2;
        }
      }
    }
  }
}

</style>
