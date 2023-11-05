<template>
  <div>
    <p>This is a protected page</p>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Username: {{ user.username }}</p>
      <UButton @click="logout" label="Logout" color="black" />
      <UButton @click="refresh" label="Refresh" color="black" />
      <h4 class="mt-4 font-semibold">Posts</h4>
      <ul class="mt-8 space-y-4">
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { user } = usePocketBaseUser();
const pb = usePocketBaseClient();
definePageMeta({
  middleware: ["auth"],
});

const { data: posts, refresh } = await useAsyncData(
  "posts",
  async () => {
    const records = await pb.collection("posts").getFullList({
      sort: "-created",
    });
    return records;
  },
  {
    server: false,
  }
);

onMounted(() => {
  pb.collection("posts").subscribe("*", function (e) {
    if (e.action === "create") {
      console.log("new post created");
      posts.value = [e.record, ...posts.value];
    }
    if (e.action === "delete") {
      console.log("post deleted");
      posts.value = posts.value.filter((post) => post.id !== e.record.id);
    }
    if (e.action === "update") {
      console.log("post updated");
      posts.value = posts.value.map((post) => {
        if (post.id === e.record.id) {
          return e.record;
        }
        return post;
      });
    }
  });
});

async function logout() {
  try {
    await pb.authStore.clear();
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
