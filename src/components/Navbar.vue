<template>
  <v-app-bar color="primary" dark flat app>
    <router-link tag="h2" to="/" class="text-uppercase">
      Poll<span class="font-weight-light">Wall</span>
    </router-link>

    <v-spacer />

    <!-- Not signed in links -->
    <v-btn v-if="!signedIn" to="/signup" class="mr-1" text>
      Sign up
    </v-btn>
    <v-btn v-if="!signedIn" to="/login" text>
      Login
    </v-btn>
    <!-- Signed in links -->
    <v-btn v-if="signedIn" @click="signOut" text>
      Sign out
    </v-btn>
  </v-app-bar>
</template>

<script>
import { auth } from "@/firebase"
export default {
  name: "Navbar",
  props: ["signedIn"],
  methods: {
    signOut() {
      return auth.signOut()
    }
  }
}
</script>
