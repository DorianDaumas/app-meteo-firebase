import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from "firebase";
import store from "./store";

Vue.config.productionTip = false

let firebaseConfig = {
  apiKey: "AIzaSyDXgKFJ43bwTxHrs2oc5zDb-WdE-6zEK8Q",
  authDomain: "appmeteo-d27e1.firebaseapp.com",
  databaseURL: "https://appmeteo-d27e1.firebaseio.com",
  projectId: "appmeteo-d27e1",
  storageBucket: "appmeteo-d27e1.appspot.com",
  messagingSenderId: "307491099893",
  appId: "1:307491099893:web:e7dba4a30cab687358a1bc",
  measurementId: "G-4KXTLR8HFZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});



new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
