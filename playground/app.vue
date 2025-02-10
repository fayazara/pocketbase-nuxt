<template>
  <div>
    <h1>Hello</h1>
  </div>
</template>

<script setup>
const { pb } = usePocketbase()

onMounted(async () => {
  console.log(pb)
})
</script>
