<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = () => {
  if (email.value && password.value) {
    router.push("/dashboard");
  } else {
    alert("Please enter email and password.");
  }
};
</script>

<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    style="height: 100vh"
  >
    <v-card class="pa-5" max-width="400">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="login" color="primary" block>Login</v-btn>
        <v-btn text @click="$router.push('/reset-password')" block
          >Forgot Password?</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped></style>
