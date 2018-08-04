<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

body {
  &.sign-in {
    background-color: #242424;
  }
}
</style>
