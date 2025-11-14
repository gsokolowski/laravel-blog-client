<template>
  <div class="flex justify-center pt-7">
    <div class="space-x-3">
      <RouterLink class="font-bold hover:text-blue-500 text-indigo-700" to="/dashboard">Dashboard</RouterLink>
      <RouterLink class="font-bold hover:text-blue-500 text-indigo-700" to="/">Home</RouterLink>
      <RouterLink
        v-if="!store.authenticated"
        class="font-bold hover:text-blue-500 text-indigo-700"
        to="/login"
      >
        Login
      </RouterLink>
      <button
        v-if="store.authenticated"
        @click="handleLogout"
        class="font-bold hover:text-blue-500 text-indigo-700"
      >
        Logout
      </button>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { userState } from "./stores/user"
import axios from 'axios';
import router from './router';


const store = userState()
console.log('user authenticated: '+ store.authenticated)

const handleLogout = async () => {
  try {
    await axios.post('/logout') // Fortify logout endpoint should kill cross cookies
 
    store.logout() // clear local state null user state
    console.log('user authenticated: '+ store.authenticated)
    console.log('store.logout() called - redirection to login page')

    // redirect to login page
    router.push('/login')

  } catch (error) {
    console.error('Logout failed:', error.response ? error.response.data : error)
  }
}
</script>
