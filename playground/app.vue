<template>
  <div>
    <h1>Hello</h1>
    <form @submit.prevent="register">
      <input
        v-model="email"
        type="email"
      >
      <input
        v-model="password"
        type="password"
      >
      <button type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { signup } = usePocketbaseAuth()

const email = ref('')
const password = ref('')
const name = ref('')
const passwordConfirm = ref('')
const register = async () => {
  await signup({
    email: email.value,
    password: password.value,
    name: name.value,
    passwordConfirm: passwordConfirm.value,
  })
}
</script>
