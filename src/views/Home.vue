<template>
  <div class="home">
    <div v-if="currentUser" class="hello">
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          Hello, {{ currentUser.name }}!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'home',

  computed: {
    ...mapState('auth', ['currentUser']),
  },
};
</script>

<style lang="scss" scoped>
.hello {
  margin-top: 120px;
  text-align: center;
}
</style>
