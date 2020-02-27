<template>
  <span class="navbar-text">
    <button @click="logout" class="btn btn-danger text-light btn-sm"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
  </span>
</template>

<script>
export default {
  name : 'ButtonLogout',
  methods : {
    logout(){
      this.$swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
      }).then((result) => {
        console.log(result)
        if (result.value) {
          this.$toast.fire({
            icon: 'success',
            title: 'Successfully Logout!'
          })
        localStorage.clear()
        this.$router.push({ name : 'Login' })
        }
      })
    }
  }
}
</script>

<style>

</style>