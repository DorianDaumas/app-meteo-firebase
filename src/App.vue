<template>
  <div id="app">
    <Auth ></Auth>
  </div>
</template>

<script>
import Auth from "./components/Auth.vue"

export default {
  name: 'App',
  components: {
    Auth,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

body{
  margin: 0px;
  background: #03405b
}
</style>
