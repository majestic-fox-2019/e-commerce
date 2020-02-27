<template>
  <div class="col-md-8 text-left shadow-lg text-white rounded p-5 mb-5">
    <h2 class="font-weight-bold mb-4">Update User</h2>
    <hr />
    <form @submit.prevent="putUser">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" />
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-primary mx-4 font-weight-bold mt-4" @click="$router.push('/user')">Cancel</button>
        <button type="submit" class="btn btn-primary mx-4 font-weight-bold mt-4">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../helper/api";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: null,
      password: "",
      id: null
    };
  },
  methods: {
    putUser() {
      const value = {
        email: this.email,
        password: this.password
      };
      api
        .put(`/users/${this.id}`, value, {
          headers: { token: localStorage.access_token }
        })
        .then(({ data }) => {
          Swal.fire("Success", data.message, "success");
          this.$router.go(-1);
          this.$emit("success");
        })
        .catch(err => {
          let msg = Array.isArray(err.response.data.message)
            ? err.response.data.message.join(", ")
            : err.response.data.message;
          Swal.fire("Error", msg, "warning");
        });
    }
  },
  created() {
    let user = this.users.filter(item => {
      return item.id === this.$route.params.id;
    })[0];
    this.email = user.email;
    this.id = user.id;
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  }
};
</script>
