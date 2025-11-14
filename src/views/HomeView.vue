<template>
  <main class="flex justify-center flex-col">
    <div class="w-1/2 mx-auto mt-3 border-b p-4 space-y-4" v-for="post in posts">
      <h1 class="text-2xl font-mochiy text-teal-600  hover:text-teal-500">
        <RouterLink :to="{name: 'post.show', params: {id: post.id} }">
          {{post.title}}
        </RouterLink>
      </h1>
      <p class="text-gray-500">
        created at : {{ formatDate(post.created_at) }}
      </p>
    </div>
    <div class="flex justify-center space-x-3 mb-10">
      <button v-show="pagination.prev_page_url" :disabled=" ! pagination.prev_page_url" @click="fetchPostsWithPagination(pagination.prev_page_url)" class="text-blue-600 capitalize">previous</button>
      <button v-show="pagination.next_page_url" :disabled=" ! pagination.next_page_url" @click="fetchPostsWithPagination(pagination.next_page_url)" class="text-blue-600 capitalize">next</button>
    </div>
  </main>
</template>
<script setup>
import axios from 'axios';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

// for posts listing
const posts = ref({}) //empty object

// Pagination comes in response.data.posts.data as next_page_url and prev_page_url
const pagination = ref({}) //empty object 

// fetchPostsWithPagination with url parameter - default url is 'api/posts' this is required for pagination
const fetchPostsWithPagination = async (url='api/posts') => {
    await axios
        .get(url)
        .then(response => {
            // you need to get down the response tree to get posts data. api is returning posts in json
            console.log(response)
            if(response.status == 200) { 
                posts.value = response.data.posts.data
                pagination.value = {
                    next_page_url: response.data.posts.next_page_url,
                    prev_page_url: response.data.posts.prev_page_url
                } 
            }
        })
}

const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD H:m')
}

// initial call fetchPostsWithPagination() onMounted then later on next and previose buttons
onMounted(() => {
  fetchPostsWithPagination()
});

</script>