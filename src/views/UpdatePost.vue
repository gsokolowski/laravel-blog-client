<template>
    <div class="text-2xl">
        Update Post
    </div>

    <div>
        <form action="#" method="post" @submit.prevent="updatePost"
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
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
            </div>
            <div>
                <!-- {{ title }}
                {{ body }}
                {{ errors }} -->
            </div>
        </form>
    </div>  
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const post = ref({}) // object post to store post data when data is taken from api
const title = ref('')
const body = ref('')
const errors = ref({})

const route = useRoute() // get url from web

const fetchPost = async () => {
    await axios
        .get('/api/posts/' + route.params.id)
        .then(response => {
            console.log(response);
            //assign response.data.post to post value which will be used in form
            title.value = response.data.post.title
            body.value = response.data.post.body
        })
}

const updatePost = async () => {
    
    await axios
        .put('/api/posts/' +route.params.id, {
            title: title.value, // value from form v-model="title"
            body: body.value    // value from form v-model="body"
        })
        .then(response => {
            console.log("Form loaded with previouse values");
            if(response.status == 200){
                errors.value = {} // reset errors.value to empty so it doesnt keep red errors under form fields
            }

        }).catch(errs => {
            console.log(errs)
            if(errs.response.status == 422) {
                errors.value = errs.response.data.errors
            }
        })
}

onMounted(() => {
  fetchPost()
});
</script>