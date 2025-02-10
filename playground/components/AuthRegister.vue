<template>
  <div class="form-container">
    <h2>Create an account</h2>
    <form
      class="form"
      @submit.prevent="register"
    >
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        class="form-input"
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
      <input
        v-model="passwordConfirm"
        type="password"
        placeholder="Confirm Password"
        class="form-input"
      >
      <button
        type="submit"
        class="form-button"
      >
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { signup, loading } = usePocketbaseAuth()
const email = ref('')
const password = ref('')
const name = ref('')
const passwordConfirm = ref('')

const register = async () => {
  try {
    await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      passwordConfirm: passwordConfirm.value,
    })
    alert('Account created successfully, verify it')
  }
  catch (error) {
    alert('Error creating account Check console for more details')
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
