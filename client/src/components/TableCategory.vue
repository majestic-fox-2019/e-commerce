<template>
    <div>
    <table class="table table-striped table-bordered table-hover">
        <thead class="text-center">
        <tr>
          <th style="width: 5%">No</th>
          <th>Category Name</th>
          <th style="width: 10%">Action</th>
        </tr>
      </thead>
      <tbody class="text-center">
          <tr :key="i" v-for="(category, i) in categories">
            <td>{{ i + 1 }}</td>
            <td>
              <input v-if="activeIndex == category.id" type="text" style="50px;" class="form-control" v-model="category.category_name">
              <span v-else>{{ category.category_name }}</span>
            </td>
            <td>
              <button v-if="activeIndex == category.id" @click.prevent="updateCategory(category.category_name, category.id)" class="btn btn-sm btn-info"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>&nbsp;
              <button v-if="activeIndex == category.id" @click.prevent="cancelUpdate()" class="btn btn-sm btn-danger"><i class="fa fa-ban" aria-hidden="true"></i></button>&nbsp;
              <button v-if="activeIndex != category.id" @click.prevent="updateForm(category.id)" class="btn btn-sm btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i></button>&nbsp;
              <ButtonDelete v-if="activeIndex != category.id" :data_id="category.id" content="categories"/>
            </td>
          </tr>
      </tbody>
    </table>  
  </div>
</template>

<script>
import ButtonDelete from '../components/Main/layouts/ButtonDelete'

export default {
  name: 'TableCategory',
  data(){
    return {
      activeIndex: null
    }
  },
  components: {
    ButtonDelete
  },
  props: ['categories'],
  methods: {
    updateForm(id){
      this.activeIndex = id
    },
    cancelUpdate(){
      this.activeIndex = null
    },
    updateCategory(category_name, id){
      const value = { category_name }

      this.$swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update data!'
      }).then((result) => {
        if (result.value) {
          return this.$axios({
            headers : {
              token: localStorage.token
            },
            url: `/categories/admin/${id}`,
            method: 'put',
            data: value
          })
        }
      })
      .then(response => {
        this.$toast.fire({
          icon: 'success',
          title: `Success update category ${response.data.category_name}`
        })
        this.activeIndex = null
      })
      .catch(err => {
        this.$toast.fire({
          icon: 'error',
          title: err.response.data
        })
      })
    }
  }
}
</script>

<style>

</style>