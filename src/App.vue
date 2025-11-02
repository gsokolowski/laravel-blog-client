<template>
  <router-view />

  <h1 class="text-3xl font-bold underline text-red-600">Hello world! axios</h1>

  <div>
    <p>Click to setup csrf-cookie and login to localhost</p>
    <button
      @click="setCookieAndLogin"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Click Me to log csrf-cookie
    </button>

    <button
      @click="getUserData"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Get User data
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
// run this code on button click setCookieAndLogin() asyncronicly
const setCookieAndLogin = async () => {
  try {
    // becouse of async this .get call will be called first
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then((response) => {
        console.log("set sanctum csrf-cookie");
      });

    // then once csrf-cookie is set that call .post will be called second
    await axios
      .post("http://localhost:8000/login", {
        email: "greg.sokolowski@email.com",
        password: "password",
      })
      .then((response) => {
        console.log("logged in with user credentials");
      });
  } catch (error) {
    console.error("Error during login flow:", error);
  }
};

const getUserData = () => {
  try {
    axios.get("http://localhost:8000/api/user").then((response) => {
      console.log(response);
    });
  } catch (error) {
    console.error("Error during getuserData", error);
  }
};
</script>
