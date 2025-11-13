import { defineStore } from "pinia"
import axios from "axios"
import router from "@/router"

export const userState = defineStore("user", {
  // persist pinia state
  persist:true,
  // initial state of user pre login
  state: () => ({
    user: null,
    authenticated: false,
  }),
  // to access state of user
  getters: {
    getUser: (state) => state.user,
  },
  // global methodes related to user e.g login()
  actions: {
    async setCookieAndLogin(data) {
    console.log(data);
    try {
            // Request CSRF token first
            await axios
                .get('/sanctum/csrf-cookie')      
                .then((response) => {
                console.log("set sanctum csrf-cookie");
            });

            // Attempt login ser with emial and password passed in data
            await axios
                .post('/login', data)
                .then((response) => {
                    console.log("Attempting login user with  credentials");
                });

            // Fetch user info after successful login
            const res = await axios.get('/api/user')

            if (res.status === 200 && res.data) {
                // set user state on Pinia
                this.user = res.data
                this.authenticated = true
                console.log(res.data);
                router.push({name:'dashboard'});
            } else {
                console.warn('Unexpected response when fetching user:', res)
            }

        } catch (error) {
            // Handle login errors gracefully
            if (error.response) {
                console.error('Login failed:', error.response.data)
                // You can show a toast or error message here
            } else {
                console.error('An unexpected error occurred:', error)
            }

            // Important: rethrow the error so Login.vue can catch it
            throw error;
        }
    },
    async logout() {
        this.user = null // bring user to initial state of user pre login
        this.authenticated  = false // no longer authenticated
        localStorage.removeItem('token') // optional
    }
  },
});
