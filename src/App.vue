<template>
  <v-app style="width: 100vw !important; overflow-x: hidden;">
    <Navbar :signedIn="signedIn" />
    <v-content>
      <v-row class="fill-height">
        <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2">
          <router-view />
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar"
import { auth } from "@/firebase"

export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    signedIn: false
  }),
  created() {
    this.$store.dispatch("setUser")
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.signedIn = true
    }
    auth.onAuthStateChanged(user => {
      if (user) {
        this.signedIn = true
        localStorage.setItem("user", JSON.stringify(user))
        if (this.$route.name !== "Home") this.$router.push("/")
      } else {
        this.signedIn = false
        localStorage.removeItem("user")
        if (this.$route.name === "Home") this.$router.push("/login")
      }
      this.$store.dispatch("setUser")
    })
  }
}
</script>
