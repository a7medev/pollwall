<template>
  <div>
    <v-card class="mx-5">
      <v-card-text class="pa-7">
        <h1 class="mb-7">Login</h1>

        <form @submit.prevent="login" ref="login">
          <v-text-field
            prepend-icon="mdi-email"
            label="Email Address"
            :rules="emailRules"
            name="email"
          />
          <v-text-field
            prepend-icon="mdi-shield-lock"
            label="Password"
            :rules="passwordRules"
            type="password"
            name="password"
          />
          <v-btn type="submit" color="primary" depressed large>
            Login
            <v-icon right>mdi-login</v-icon>
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { auth } from "@/firebase"

export default {
  name: "Login",
  data: () => ({
    emailRules: [
      v => !!v || "Email field can't be empty",
      v => {
        const regex = /^[a-z0-9-._]+@[a-z0-9-._]+$/gi
        return (!!v && regex.test(v.trim())) || "Enter a valid Email"
      }
    ],
    passwordRules: [v => !!v || "Password field can't be empty"]
  }),
  methods: {
    login() {
      const { email, password } = this.$refs.login
      auth.signInWithEmailAndPassword(email.value.trim(), password.value)
    }
  }
}
</script>
