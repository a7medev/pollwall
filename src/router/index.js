import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/auth/Login.vue"
import Signup from "../views/auth/Signup.vue"

Vue.use(VueRouter)

const auth = async (to, from, next) => {
    let user = localStorage.getItem("user")

    if (user !== null) {
      return next()
    }

    return router.replace("/login")
  },
  unAuth = async (to, from, next) => {
    let user = localStorage.getItem("user")

    if (user === null) {
      return next()
    }

    return router.replace("/")
  }

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: auth
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: unAuth
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: unAuth
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
