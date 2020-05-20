<template>
  <div class="hello">
    <Login></Login>
  </div>
</template>

<script>

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

export default {
  components: {
    Login, Register
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
