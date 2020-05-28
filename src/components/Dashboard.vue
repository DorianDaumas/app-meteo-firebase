<template>
  <div>
    <nav>
      <ul>
        <li><a  @click.prevent="signOut"><img class="logout" src="../assets/deconnexion.svg"></a></li>
      </ul>
    </nav>
    </br></br></br></br>
    <div v-if="user.loggedIn" >
      <h1>BONJOUR !</h1>
      <InfoMeteo></InfoMeteo>
    </div>

    <div v-else>
      <h1>Connecter vous pour acceder à votre dashboard</h1>
       <a @click.prevent="signOut"><img src="../assets/arrow.svg"></a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
import firebase from "firebase";
import InfoMeteo from '../views/InfoMeteo.vue'

export default {
  name: 'Dashboard',
  components: {
    InfoMeteo,
  },
  computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: "user",
        
      })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login"
          });
        });
    },
  }
}

</script>

<style>
ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-bottom: 0!important
}
li{
  text-align: start;
  padding-left: 35px;

}
.logout{
  width: 30px;
  transform: rotate(180deg);
  cursor: pointer;
  display: flex;
}
nav{
  background-color: #161616;
  padding: 6px;
}
img{
  width: 120px;
  transform: rotate(180deg);
  cursor: pointer
}

</style>
