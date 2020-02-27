<template>
    <a @click.prevent="deleteData(data_id)"  class="btn btn-sm btn-secondary text-light"><i class="fa fa-trash" aria-hidden="true"></i></a>
</template>

<script>
export default {
  name : 'ButtonDelete',
  props : ['data_id', 'content'],
  methods : {
    deleteData(id){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.value) {
          return this.$axios({
            headers : {
              token : localStorage.token
            },
            method : 'delete',
            url : `/${this.content}/admin/${id}`
          })
          }
      })
      .then(response => {
        console.log(response)
        this.$toast.fire({
          icon: 'success',
          title: 'Product has been deleted'
        })
        if(this.content == 'users'){
          this.$store.dispatch('getAdmin')
        }else{
          this.$store.dispatch('getProduct')
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>