<template>
  <div>
    <button @click="handleGoogleLogin">
      <img
        src="https://api.iconify.design/devicon:google.svg"
        alt="Google"
      >
      {{ loading ? 'Signing in...' : 'Login with Google' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { handleOAuth } = usePocketbaseAuth()
const loading = ref(false)
const handleGoogleLogin = async () => {
  try {
    loading.value = true
    await handleOAuth('google', {
      redirectPath: '/protected',
    })
  }
  catch (error) {
    console.error('Google login failed:', error)
    loading.value = false
    alert('Failed to login with Google. Please try again.')
  }
}
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
