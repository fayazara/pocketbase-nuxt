<template>
  <div class="space-y-4">
    <UInput v-model="email" label="Email" placeholder="Email" />
    <UInput
      v-model="password"
      label="Password"
      placeholder="password"
      type="password"
    />
    <UButton @click="login" label="Login" color="black" />
    <br />
    <UButton @click="loginWithGithub" label="Login with Github" color="black" />
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");
const pb = usePocketBaseClient();
async function login() {
  try {
    await pb.collection("users").authWithPassword(email.value, password.value);
    navigateTo("/dashboard");
  } catch (error) {
    console.log(error);
  }
}

async function loginWithGithub() {
  try {
    const data = await pb
      .collection("users")
      .authWithOAuth2({ provider: "github" });
    navigateTo("/dashboard");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
