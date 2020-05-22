<template>
  <div>

    <div v-if="!user.loggedIn" class="login">
      <h1>Login</h1>

      <div v-if="error" class="alert alert-danger" v-html="error"></div><br><br>

      <form action="#" @submit.prevent="submit">

        <label for="mail">Email:</label><br>
        <input required type="text" id="email" name="email" v-model="form.email"><br><br>

        <label for="mdp">Mots de passe:</label><br>
        <input required type="password" id="mdp" name="mdp" v-model="form.password"><br><br>
        
        <input type="submit" value="Submit">

      </form> 
    </div>

    <div v-else>
      {{pushToDashboard()}}
    </div>

  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import store from "../store";

export default {

  name: 'Login',
  data() {
    return {
      form: {
        email: "",
        password: "" 
      },
    error: null, 
    }
  },
  store: store,
  computed: {
      ...mapGetters({
        user: "user",
        
      })
  },
  methods: {
    pushToRegister(){
      this.$router.replace({ name: "Register" });
    },
    pushToDashboard(){
      this.$router.replace({ name: "Dashboard" });
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          if(err.code === "auth/user-not-found"){
            err.message = ` <p>Votre mail ne correspond pas à un mail MeteoApp</p>`
            this.error = err.message;
          }
          else if(err.code === "auth/invalid-email"){
            err.message = "Votre Email n'est pas valid."
            this.error = err.message;
          }
          else if (err.code === "auth/wrong-password"){
            err.message = "Votre mots de passe n'est pas valide."
            this.error = err.message;
          }
          console.log(err)
        });
    }
  },
}
</script>
