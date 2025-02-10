<template>
  <div class="container">
    <h1>Welcome to Pocketbase Nuxt Playground</h1>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/protected">Protected</NuxtLink>
    </nav>
    <hr>
    <NuxtPage />
  </div>
</template>

<style scoped>
.container {
  font-family:
  ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Segoe UI Symbol", "Noto Color Emoji";
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #000;
}

.router-link-exact-active {
  color: blue;
}
</style>
