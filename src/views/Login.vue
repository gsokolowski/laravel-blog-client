<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="setCookieAndLogin">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p class="text-red-500" v-if="errors?.email">
              {{ errors.email[0] }}
            </p>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p class="text-red-500" v-if="errors?.password">
              {{ errors.password[0] }}
            </p>
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>

      {{ email }}
      {{ password }}
    </div>
  </div>
</template>

<script setup>
// import userState from Pinia stores/user.js
import { userState } from "../stores/user"
import { ref } from "vue"

const email = ref("") // reads directly from form field email
const password = ref("") // reads directly from form field password
const errors = ref({}) // set errors as empty object 


const store = userState() // "user" store installed

// lets call setCookieAndLogin() method from stores/user.js
const setCookieAndLogin = () => {
    store.setCookieAndLogin({ // pass data as an object 
      email: email.value,
      password: password.value
    }).catch(err => {
      console.log(err);
      if(err.response.status == 422) {
        //alert('error');
        errors.value = err.response.data.errors
      }
    });
}
</script>
