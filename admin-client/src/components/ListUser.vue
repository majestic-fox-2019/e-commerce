<template>
  <div>
    <div v-if="Array.isArray(users)">
      <table class="table text-white table-dark text-left">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users" :key="user.id">
            <th scope="row">{{i+1}}</th>
            <td>{{user.email}}</td>
            <td>
              <div v-if="user.email !== 'super_admin@mail.com'">
                <router-link :to="{name: 'update_user', params: {id: user.id}}">
                  <i class="btn btn-info fa mx-2 fa-edit"></i>
                </router-link>
                <i class="btn btn-warning fa mx-2 fa-trash" @click.prevent="deleteUser(user.id)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <no-data v-else :msg="users" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import api from "../helper/api";
import NoData from "../components/NoData";
export default {
  components: {
    NoData
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    deleteUser(id) {
      Swal.fire(
        "Confirmation",
        "Are you sure want to delete this user?",
        "question"
      ).then(res => {
        if (res.value) {
          api
            .delete(`/users/${id}`, {
              headers: { token: localStorage.access_token }
            })
            .then(({ data }) => {
              Swal.fire("Success", data.message, "success");
              this.$emit("success");
            })
            .catch(err => {
              Swal.fire("Error", err.response.data.message, "warning");
            });
        }
      });
    }
  }
};
</script>

<style>
</style>