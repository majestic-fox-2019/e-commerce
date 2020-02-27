<template>
  <div class="col-md-8 text-left shadow-lg text-white rounded p-5 mb-5">
    <h2 class="font-weight-bold mb-4">Add User</h2>
    <div v-if="msg" class="alert alert-danger">{{msg}}</div>
    <hr />
    <form @submit.prevent="postUser">
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
        <button type="submit" class="btn btn-primary w-50 font-weight-bold mt-4">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../helper/api'
export default {
  data () {
    return {
      email: '',
      password: '',
      msg: null
    }
  },
  methods: {
    postUser () {
      const value = {
        email: this.email,
        password: this.password,
        roleId: 2
      }
      api
        .post('/users', value, {
          headers: { token: localStorage.access_token }
        })
        .then(({ data }) => {
          if (data.message) {
            this.msg = data.message
          } else {
            this.msg = null
            this.$router.go(-1)
            this.$emit('success-add-user')
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
