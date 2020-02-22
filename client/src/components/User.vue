<template>
  <div class="container mt-5">
    <h3 class="font-weight-bold text-left">User List</h3>
    <div class="text-right mb-4">
      <button @click="gotoAddForm" class="btn btn-light font-weight-bold">
        <i :class="isAddData ?'fa fa-arrow-left mr-2': 'fa fa-plus mr-2'"></i>
        {{isAddData ? 'Cancel' : 'ADD'}}
      </button>
    </div>
    <div v-if="!isAddData">
      <div v-if="users">
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
                <router-link :to="{name: 'UpdateUser', params: {id: user.id}}">
                  <i class="btn btn-info fa mx-2 fa-edit"></i>
                </router-link>

                <router-link :to="{name: 'DeleteUser', params: {id: user.id}}">
                  <i class="btn btn-warning fa mx-2 fa-trash"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <no-data v-else :msg="msg" />
    </div>
    <router-view @success-add-user="success"></router-view>
  </div>
</template>

<script>
import NoData from "../components/NoData";
export default {
  components: {
    NoData
  },
  data() {
    return {
      users: null,
      isAddData: false,
      msg: null
    };
  },
  methods: {
    gotoAddForm() {
      this.isAddData = !this.isAddData;
      if (!this.isAddData) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: "AddUser" });
      }
    },
    getUsers() {
      this.$axios
        .get("/users", { headers: { token: localStorage.access_token } })
        .then(({ data }) => {
          if (Array.isArray(data)) {
            this.users = data;
          } else {
            this.msg = data.message;
          }
        })
        .catch(({ response }) => console.log(response));
    },
    success() {
      this.isAddData = !this.isAddData;
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
</style>
