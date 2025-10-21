<template>
  <h1 class="text-3xl font-bold underline text-red-600">
    Hello world! axios
  </h1>
</template>

<script setup>
import axios from 'axios';
axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
    // Login...
});
</script>