<template>
  <div>
    <h1>Protected Page</h1>
    <div>
      <p>Name: {{ user?.name }}</p>
      <p>Email: {{ user?.email }}</p>
      <button @click="logout">
        {{ loading ? "Signing out..." : "Sign Out" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
const { user, signOut } = usePocketbaseAuth()
const loading = ref(false)
const logout = async () => {
  loading.value = true
  await signOut()
  await navigateTo('/')
}
</script>

<style scoped>
button {
  padding: 0.5rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>
