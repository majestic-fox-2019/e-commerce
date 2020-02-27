<template>
  <div class="col-md-4 mx-auto form-container">
    <h3 class="text-center pt-4 pb-2">Admin Login Page</h3>
      <Form />
    <p class="text-center text-muted p-4 small-font">Arona Nur Tetulis &copy; 2020</p>
  </div>

</template>

<script>
import Form from './Form'

export default {
  name : 'FormContainer',
  components : {
    Form
  }
}
</script>

<style>
  .form-container{
    position: relative;
    top: 100px;
    border-radius: 5px;
    background-color: white;
    min-height: 250px;
  }
  .btn-full-width {
    width: 100%;
  }
  .small-font {
    font-size: 12px;
  }
</style>