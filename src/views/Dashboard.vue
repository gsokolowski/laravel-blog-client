<template>
    <div>
      <h1>Dashboard</h1>
    </div>
    <div>
        <form action="#" method="post" @submit.prevent="createPost"
            class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto space-y-5">
            <div class="col-span-full w-1/3 mx-auto">
                <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>

                <div class="mt-2">
                    <input 
                    id="title" 
                    name="title"
                    v-model="title"
                    type="text" 
                    autocomplete="off"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p class="text-red-500" v-if="errors?.title">
                    {{ errors.title[0] }}
                </p>
            </div>
            <div class="col-span-full w-1/3 mx-auto">
                <label for="body" class="block text-sm font-medium leading-6 text-gray-900">Body</label>
                <div class="mt-2">
                    <textarea 
                    id="body" 
                    name="body" 
                    v-model="body"
                    rows="3" 
                    cols="50"
                    class="block w-full mx-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p class="text-red-500" v-if="errors?.body">
                    {{ errors.body[0] }}
                </p>

            </div>
            <div class="mt-6 flex justify-center items-center gap-x-6 w-full">
                <button type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
            </div>
            <div>
                <!-- {{ title }}
                {{ body }}
                {{ errors }} -->
            </div>
        </form>

        <div class="flex items-center justify-center">
            <div class="w-full w-1/2">

                <div class="flex justify-between my-4 px-10">
                    <h2 class="text-xl font-bold">Post</h2>
                    <h2 class="text-xl font-bold">Actions</h2>
                </div>

                <div class="flex justify-between text-center space-y-3 px-10" v-for="post in posts">
                    <p class="text-lg font-semibold">{{ post.title }}</p>
                    <div class="space-x-4">
                        <RouterLink to="/" class="text-blue-400">Edit</RouterLink>
                        <button class="text-red-400">Delete</button>
                    </div>
                </div>

                <div class="flex justify-center space-x-3 mb-10">
                    <button :disabled=" ! pagination.prev_page_url" @click="fetchPosts(pagination.prev_page_url)" class="text-blue-600 capitalize">previous</button>
                    <button :disabled=" ! pagination.next_page_url" @click="fetchPosts(pagination.next_page_url)" class="text-blue-600 capitalize">next</button>
                </div>

            </div>
        </div>
    </div>    
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';


// set form fields 
const title = ref('') // empty string
const body = ref('') // empty string
const errors = ref({
    next_page_url: null, // empty values 
    prev_page_url: null  // empty values 
})

// for posts listing
const posts = ref({}) //empty object

// Pagination comes in response.data.posts.data as next_page_url and prev_page_url
const pagination = ref({}) //empty object 

const createPost = async () => {
    await axios
        .post('/api/posts', {
            title: title.value,
            body: body.value
        })
        .then(response => {
            console.log("Sending Post data to /api/posts");
            if(response.status == 201) {
                // clearing form fields on 201 (created)
                title.value = ''
                body.value = ''
                console.log("clearing form fields");
            }
        }).catch(errs => {
            console.log(errs)
            // Where to get errors from?
            // from console on thap POST AxiosError
            // AxiosError response.status == 422
            // AxiosError response.data.errors == 422
            if(errs.response.status == 422) {
                errors.value = errs.response.data.errors
            }
        })
}

// fetchPosts with url parameter - default url is 'api/posts' this is required for pagination
const fetchPosts = async (url='api/posts') => {
    await axios
        .get(url)
        .then(response => {
            // you need to get down the response tree to get posts data. api is returning posts in json
            console.log(response)
            posts.value = response.data.posts.data
            pagination.value = {
                next_page_url: response.data.posts.next_page_url,
                prev_page_url: response.data.posts.prev_page_url
            } 
        })
}

// initial call fetchPosts() onMounted then later on next and previose buttons
onMounted(() => {
  fetchPosts()
});

</script>
