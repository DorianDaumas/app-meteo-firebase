<template>
  <div class="hello">
    <div v-if="!user.loggedIn" id="nav">
      <router-link class="link" to="/">Connexion</router-link> |
      <router-link class="link" to="/Register">Inscriptions</router-link>  
    </div>
    <router-view/>
  </div>
  
</template>

<script>

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from "../store";
import { mapGetters } from "vuex";

export default {
  name: "Auth",
  components: {
    Login, Register
  },
    computed: {
    ...mapGetters({
      user: "user",
    })
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.link{
  color: white;
  font-size: large
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
#nav{
  position: absolute;
  left: 50%;
  top: 5%;
  width: 100%;
  transform: translate(-50%, -50%);
}
</style>
