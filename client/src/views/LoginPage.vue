<template>
  <div class="container-fluid full-height">
    <FormContainer />
  </div>
</template>

<script>
import FormContainer from '../components/Login/FormContainer';

export default {
  name : 'LoginPage',
  components : {
    FormContainer
  },
}
</script>

<style scoped>
.full-height {
  background-image: url('https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/07/7023aa236bccc6e367567beef5724e20.jpg');
  height: 100vh;
}
</style>