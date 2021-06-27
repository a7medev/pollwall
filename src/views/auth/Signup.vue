<template>
  <div>
    <v-card class="mx-5">
      <v-card-text class="pa-7">
        <h1 class="mb-7">Sign up</h1>

        <form @submit.prevent="signup" ref="signup">
          <v-text-field
            :rules="nameRules"
            prepend-icon="mdi-account"
            label="Full Name"
            name="displayName"
          />
          <v-text-field
            :rules="emailRules"
            prepend-icon="mdi-email"
            label="Email Address"
            name="email"
          />
          <v-text-field
            :rules="passwordRules"
            prepend-icon="mdi-shield-lock"
            label="Password"
            type="password"
            name="password"
          />
          <v-btn type="submit" color="primary" depressed large>
            Sign up
            <v-icon right>mdi-account-plus</v-icon>
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { auth } from "@/firebase"

export default {
  name: "Signup",
  data: () => ({
    nameRules: [v => (!!v && !!v.trim()) || "Name field can't be empty"],
    emailRules: [
      v => (!!v && !!v.trim()) || "Email field can't be empty",
      v => {
        const regex = /^[a-z0-9-._]+@[a-z0-9-._]+$/gi
        return (!!v && regex.test(v.trim())) || "Enter a valid Email"
      }
    ],
    passwordRules: [
      v => !!v || "Password field can't be empty",
      v => (!!v && v.length >= 6) || "Password can't be less than 6 characters"
    ]
  }),
  methods: {
    signup() {
      const { displayName, email, password } = this.$refs.signup
      auth
        .createUserWithEmailAndPassword(email.value.trim(), password.value)
        .then(cred => {
          return cred.user.updateProfile({
            displayName: displayName.value
          })
        })
    }
  }
}
</script>
