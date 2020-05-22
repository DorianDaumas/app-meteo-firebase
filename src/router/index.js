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
  },

]


console.log('store',store.getters.user.loggedIn);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
  
})


// router.beforeEach((to, from, next) => {
//   const isLogged = store.getters.user.loggedIn
//     if (isLogged) next()
//     else{
//       if(to.meta.requiresVisitor) next()
//       else next('/Dashboard')
//     }
// })

export default router
 