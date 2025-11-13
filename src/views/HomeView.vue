<template>
  <main class="flex justify-center flex-col">
    <div class="w-1/2 mx-auto mt-3 border-b p-4 space-y-4" v-for="post in posts">
      <h1 class="text-2xl font-mochiy text-teal-600  hover:text-teal-500">
        Title
      </h1>
      <p class="text-gray-500">
        created at 2025-11-11
      </p>
    </div>
  </main>
</template>
<script setup>

</script>