import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth.vue'
import Dashboard from '../components/Dashboard.vue'
import Register from '../views/Register.vue'
import firebase from "firebase";
import store from "../store";
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },

  {
    path: '/Register',
    name: 'Register',
    component: Register
  },

  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
   }
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('/');
  else if (!requiresAuth && currentUser) next('Dashboard');
  else next();
});


export default router
 