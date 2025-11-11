import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import UpdatePost from "@/views/UpdatePost.vue";
import { userState } from "../stores/user"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter(to,from,next){
        const store = userState()
        // check if current user is already authenticated
        if(store.getUser) {
          console.log('current user is already logegd in')
          next({ 
            name:'dashboard' // redirect user to dashboard
          })
        } else {
          next() // redirect to login page as it was going
        }
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/post/update/:id",
      name: "post.update",
      component: UpdatePost,
    },

  ],
});

export default router;
