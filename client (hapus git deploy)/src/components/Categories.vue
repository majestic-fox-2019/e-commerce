<template>
  <div class="container mt-4">
      <form @submit.prevent="submitForm" class="addForm mx-auto">
        <h2>Add Category</h2><br>
        <div class="form-group">
          <label>Category name</label>
          <input type="text" class="form-control" v-model="formData.name">
        </div>
        <center><div class="errorAdd" v-show="errorAdd">username/password is wrong</div></center>
        <button type="submit" class="btn btn-primary">Add Category</button>
      </form>
    <center class="mb-2"><h2>Category List</h2></center>
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Category Name</th>
          <th scope="col">Created By</th>
          <th scope="col">Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category,i) in categories" :key="category.id">
          <th scope="row">{{i+1}}</th>
          <td v-if="editing === category.id">
            <input type="text" v-model="category.name" value='category.name' />
          </td>   
          <td v-else>{{category.name}}</td>
          <td>{{category.addedBy}}</td>
          <td>{{convertDate(category.createdAt)}}</td>
          <td v-if="editing === category.id">
            <button class="btn btn-success mr-4" @click="updateData(category)">Save</button>
            <button class="btn btn-secondary" @click="editing = null">Cancel</button>
           </td>
          <td v-else>
            <button class="btn btn-primary mr-4" @click="editData(category.id)">edit</button>
            <button class="btn btn-danger" @click="deleteData(category.id)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      editing: null,
      category: {
        name: '',
      },
      formData: {
        name: '',
      },
      categories: null,
      errorAdd: false,
    }
  },
  created() {
    this.$axios({
        url: '/category/listCategory',
        method: 'get',
        headers: {token: localStorage.getItem('token')},
    })
      .then(datas=>{
        this.categories = datas.data
      })
      .catch(error=>{
        console.log(error)
      })
  },
  methods: {
    editData(id) {
      this.editing = id
    },
    load() {
      this.$axios({
        url: '/category/listCategory',
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
        .then(datas=>{
          this.categories = datas.data
        })
        .catch(error=>{
          console.log(error)
        })
    },
    updateData(data) {
      this.$axios({
        url: `/category/updateCategory/${data.id}`,
        method: 'put',
        headers: {token: localStorage.getItem('token')},
        data: {
          name: data.name,
        }
      })
        .then(updated=>{
          console.log(updated)
          this.editing = null
          this.$swal.success('category updated')
        })
        .catch(error=>{
          this.$swal.error(error.response.data.error[0])
        })
    },
    submitForm() {
      this.$axios({
        url: '/category/addCategory',
        method: 'post',
        headers: {token: localStorage.getItem('token')},
        data: {
          name: this.formData.name,
        }
      })
        .then(added=>{
          console.log(added)
          this.load()
          this.$swal.success('category added')
        })
        .catch(error=>{
          this.$swal.error(error.response.data.error[0])
        })
    },
    deleteData(id) {
      let status = confirm('are you sure want to delete this category?')
      if(status) {
        this.$axios({
          url: `/category/deleteCategory/${id}`,
          method: 'delete',
          headers: {token: localStorage.getItem('token')},
        })
          .then(deleted=>{
            console.log(deleted)
            this.$swal.success('category deleted')
          })
          .catch(error=>{
            this.$swal.error(error.response.data.error)
          })
      }
    },
    convertDate(date) {
      return this.$moment.convert(date)
    },
  }
}
</script>

<style scoped>
.errorAdd {
  color: red;
}
.addForm{
  margin-bottom: 20px;
  width: 300px;
}
</style>