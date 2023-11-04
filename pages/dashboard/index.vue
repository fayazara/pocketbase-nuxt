<template>
  <div>
    <p>This is a protected page</p>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Username: {{ user.username }}</p>
    </div>
  </div>
</template>

<script setup>
const { user } = usePocketBaseUser();
definePageMeta({
  middleware: ["auth"],
});
</script>

<style></style>
