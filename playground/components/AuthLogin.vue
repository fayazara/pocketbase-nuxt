<template>
  <div class="form-container">
    <h2>Login</h2>
    <form
      class="form"
      @submit.prevent="handleLogin"
    >
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="form-input"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="form-input"
      >
      <button
        type="submit"
        class="form-button"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { login, loading } = usePocketbaseAuth()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login({
      email: email.value,
      password: password.value,
    })
    return navigateTo('/protected')
  }
  catch (error) {
    alert('Error logging in Check console for more details')
    console.log(error)
  }
}
</script>

<style scoped>
.form-container {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
}

.form-button {
  padding: 0.5rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:hover {
  opacity: 0.9;
}
</style>
