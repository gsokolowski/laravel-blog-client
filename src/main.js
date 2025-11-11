import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from "./App.vue"
import router from "./router"
import axios from "axios" // import axios
import { userState } from "./stores/user"

// axios canfiguration for fetching data from laravel-blog-api
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = "http://localhost:8000"

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const store = userState()
axios.interceptors.response.use(res => {
    return res   
}, err => {
    if (err.response.status == 401) { // 401 the request was not authenticated
        // in case user session is expired you need to clear store state userState
        store.logout() // set user to null
        console.log('error 401 - the request was not authenticated - go to login page');
        router.push({name:'login'}) // redirect to login page 
    }
})

app.mount("#app")
