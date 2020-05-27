<template>
  <div class="register">
    <h1>Inscriptions</h1>

    <div v-if="error" class="alert alert-danger">{{error}}</div><br><br>

    <form action="#" @submit.prevent="submit">
      <label for="name">Nom:</label><br>
      <input required type="text" id="name" name="name" v-model="form.name" ><br><br>

      <label for="mail">Email:</label><br>
      <input required type="text" id="email" name="email" v-model="form.email"><br><br>

      <label for="mdp">Mots de passe:</label><br>
      <input required type="password" id="mdp" name="mdp" v-model="form.password"><br><br>
      
      <input type="submit" value="S'inscrire">
    </form> 

  </div>
</template>

<script>
import firebase from "firebase";
import Login from "./Login.vue"

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
      }
    },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {
              this.$router.replace({ name: "Login" });
            });
        })
        .catch(err => {
            if(err.code === "auth/weak-password"){
              err.message = `Votre mot de passe doit contenir au moins 6 caractères.`
              this.error = err.message;
            }
            else if(err.code === "auth/email-already-in-use"){
              err.message = "L'email que vous avez saisi est déjà pris."
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
<style>
.register {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}
</style>