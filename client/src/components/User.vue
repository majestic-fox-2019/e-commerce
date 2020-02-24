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
                  <router-link :to="{name: 'UpdateUser', params: {id: user.id}}">
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
    <router-view @success-add-user="success"></router-view>
  </div>
</template>

<script>
import NoData from '../components/NoData'
import api from '../helper/api'
export default {
  components: {
    NoData
  },
  data () {
    return {
      isAddData: false
    }
  },
  methods: {
    gotoAddForm () {
      this.isAddData = !this.isAddData
      if (!this.isAddData) {
        this.$router.go(-1)
      } else {
        this.$router.push({ name: 'AddUser' })
      }
    },
    success () {
      this.isAddData = !this.isAddData
      this.$store.dispatch('getUsers')
    },
    deleteUser (id) {
      api
        .delete(`/users/${id}`, {
          headers: { token: localStorage.access_token }
        })
        .then(({ data }) => {
          this.$store.dispatch('getUsers')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  mounted () {
    if (this.users === null) {
      this.$store.dispatch('getUsers')
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  }
}
</script>

<style>
</style>
