<template>
    <div class="flex flex-col justify-center items-center px-10 space-y-10 my-3">
        <h1 class="text-2xl font-mochiy text-teal-600  hover:text-teal-500">
            {{ post.title }}
              
        </h1>
        <p class="text-gray-500">
            created at : {{ formatDate(post.created_at) }}
        </p>
        <p class="text-gray-700 text-xl">
            {{ post.body }}
        </p>
    </div>
</template>
<script setup>
import axios from 'axios';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute() // get url and read params from web 
const post = ref({}) //prepare empty object post

const fetchPost =  () => {
     axios
        .get('/api/posts/' + route.params.id)
        .then(response => {
            // you need to get down the response tree to get posts data. api is returning posts in json
            console.log(response)

            if(response.status == 200) { 
                post.value = response.data.post
            }
        })
}

const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD H:m')
}

onMounted(() => {
  fetchPost()
}); 
</script>