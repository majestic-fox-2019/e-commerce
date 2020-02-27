<template>
  <div class="container mt-4">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Join Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,i) in users" :key="user.id">
          <th scope="row">{{i+1}}</th>
          <td>{{user.email}}</td>
          <td>{{user.role}}</td>
          <td>{{convertDate(user.createdAt)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      users: null,
    }
  },
  created() {
    this.$axios('/user/listUser',{
      method: 'get',
      headers: {token: localStorage.getItem('token')},
    })
    .then(users=>{
      this.users = users.data
    })
    .catch(err=>{
      console.log(err)
    })
  },
  methods: {
    convertDate(date) {
      return this.$moment.convert(date)
    }
  }
}
</script>