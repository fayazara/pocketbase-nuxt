<template>
  <nav
    class="flex items-center justify-between border-b dark:border-white/20 pb-4 mb-8"
  >
    <p class="font-semibold">PB Nuxt</p>
    <UDropdown
      :items="items"
      :ui="{ item: { disabled: 'cursor-text select-text opacity-100' } }"
    >
      <UAvatar :src="user.avatar" :alt="user.name" />

      <template #account="{ item }">
        <div class="text-left">
          <p class="text-xs">Signed in as</p>
          <p class="truncate font-medium text-gray-900 dark:text-white mt-2">
            {{ item.label }}
          </p>
          <p class="truncate text-xs text-gray-700 dark:text-white">
            {{ user.name }}
          </p>
        </div>
      </template>

      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <UIcon
          :name="item.icon"
          class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
        />
      </template>
    </UDropdown>
  </nav>
</template>

<script setup>
const pb = usePocketBaseClient();
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
async function logout() {
  try {
    pb.collection("posts").unsubscribe("*");
    await pb.authStore.clear();
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
}
const items = computed(() => {
  const userEmail = props.user.email || "Unknown User";

  return [
    [
      {
        label: userEmail,
        slot: "account",
        disabled: true,
      },
    ],
    [
      {
        label: "Documentation",
        icon: "i-heroicons-book-open",
      },
      {
        label: "Changelog",
        icon: "i-heroicons-megaphone",
      },
      {
        label: "Status",
        icon: "i-heroicons-signal",
      },
      {
        label: "Sign out",
        icon: "i-heroicons-arrow-left-on-rectangle",
        click: () => {
          logout();
        },
      },
    ],
  ];
});
</script>

<style></style>
