<template>
  <div class="container mt-4">
    <div class="table-title">
      <h4>Registered Member</h4>
    </div>
    <table class="table table-hover table-striped text-center">
      <thead class="thead-dark">
        <tr>
          <th class="row-number" scope="col">No.</th>
          <th class="name-head" scope="col">Name</th>
          <th class="email-head" scope="col">Email</th>
        </tr>
      </thead>
      <tbody class="content-table">
        <tr v-for="(user, i) in listUser" :key="user.id">
          <th class="row-number" scope="row">{{ i + 1 }}</th>
          <td class="name-head">{{ user.name }}</td>
          <td class="email-head">{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listUser: null,
      error: null
    };
  },
  methods: {
    getAllUsers() {
      this.$axios
        .get("/users/list")
        .then(res => {
          this.listUser = res.data;
        })
        .catch(error => {
          this.error = error.response;
        });
    }
  },
  created() {
    this.getAllUsers();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap");
.container {
  width: 80vw;
  max-height: 70vh;
}

.table-title {
  margin-left: 29vw;
  font-family: "Roboto Slab";
}

table {
  display: block;
  margin-top: 50px;
  margin-left: 120px;
}

tbody {
  display: block;
  height: 800px;
  overflow: auto;
}

.row-number {
  width: 100px;
}

.name-head {
  width: 300px;
}

.email-head {
  width: 400px;
}
.content-table {
  width: 800px;
  height: 60vh !important;
  font-size: 15px;
  font-weight: 600;
}
</style>