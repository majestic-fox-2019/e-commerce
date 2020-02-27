<template>
  <div>
    
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: "ProductById",
  data() {
    return{
      product: null
    }
  },
  created() {
    const vm = this;
    Swal.showLoading();
    axios({
      url: `/products/${vm.$route.params.id}`,
      method: 'get'
    })
    .then(({data}) => {
      vm.product = data
      console.log(vm.product);
      Swal.close();
    }).catch((err) => {
      console.error(err);
      Swal.fire({
        title: "Something went wrong",
        icon: "error"
      })
      .then(() => {
        vm.$router.replace("/");
      })
    });
  }
}
</script>

<style>

</style>