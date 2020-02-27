<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand">
        <router-link :to="{name: 'HomeCategory'}" style="color:white; font-size:18px">Home</router-link>
        <router-link
          :to="{ name: 'ProductByCategory', params: { categoryname: 'all' }}"
          class="ml-4"
          style="font-size:16px"
        >Product</router-link>
        <router-link :to="{ name: 'Category'}" class="ml-4" style="font-size:16px">Category</router-link>
        <router-link :to="{ name: 'UserList'}" class="ml-4" style="font-size:16px">Member</router-link>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-content">
        <ul class="navbar-nav mr-auto"></ul>
        <h6 class="mr-4 my-auto text-center" style="color:  white">Welcome, {{ username }}</h6>
        <button class="btn btn-info my-2 my-sm-0" @click.prevent="logout()">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { Toast } from "@/api/swal.js";
export default {
  data() {
    return {
      username: localStorage.name
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
      Toast.fire({
        icon: "success",
        title: "Logout Success!"
      });
    }
  }
};
</script>

<style></style>
