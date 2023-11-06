<template>
  <div>
    <div v-if="user" class="space-y-4">
      <div>
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton @click="logout" label="Logout" color="black" />
        <UButton @click="refresh" label="Refresh" color="black" />
      </div>
      <div class="flex items-center justify-between">
        <h4 class="font-semibold">Posts</h4>
        <UButton @click="newPost = true" label="Create Post" color="black" />
      </div>
      <ul class="grid grid-cols-2 gap-4">
        <li v-for="post in posts" :key="post.id">
          <div v-if="post.thumbnail">
            <img
              :src="getFileUrl(post)"
              class="h-40 w-full object-cover rounded-lg"
            />
          </div>
          <p>{{ post.title }}</p>
        </li>
      </ul>
    </div>
    <UModal v-model="newPost">
      <div class="p-4 space-y-4">
        <p>Add New Post</p>
        <UInput v-model="post.title" label="Title" placeholder="Enter title" />
        <UTextarea v-model="post.body" label="Body" placeholder="Enter body" />
        <div>
          <p class="text-sm">Post Preview Image</p>
          <div
            ref="dropZoneRef"
            class="rounded-lg h-40 bg-gray-100 ring-2 ring-gray-200 flex items-center justify-center mt-2"
            :class="{ 'animate-pulse': isOverDropZone }"
          >
            Drop files here
          </div>
        </div>
        <UButton @click="savePost" size="lg" label="Save" color="black" block />
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { useDropZone } from "@vueuse/core";

const dropZoneRef = ref();
const toast = useToast();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
const newPost = ref(false);

const post = ref({
  title: undefined,
  body: undefined,
  thumbnail: undefined,
});

const { user } = usePocketBaseUser();
const pb = usePocketBaseClient();
definePageMeta({
  middleware: ["auth"],
});

async function onDrop(files) {
  post.value.thumbnail = files[0];
}

async function savePost() {
  try {
    post.value.owner = user.value.id;
    const record = await pb.collection("posts").create(post.value);
    console.log(record);
    toast.add({
      title: "Post created successfully",
    });
    post.value = {
      title: undefined,
      body: undefined,
      thumbnail: undefined,
    };
    newPost.value = false;
  } catch (error) {
    console.log(error);
  }
}

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

function getFileUrl(post) {
  return pb.files.getUrl(post, post.thumbnail);
}

async function logout() {
  try {
    pb.collection("posts").unsubscribe("*");
    await pb.authStore.clear();
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
