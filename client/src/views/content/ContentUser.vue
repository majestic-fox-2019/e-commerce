<template>
  <div>
    <div>
      <Toaster :toaster="toaster" />
    </div>
      <Title msg="Content User"/>
      <div class="container col-md-12 d-flex justify-content-between m-2">
        <div class="col-md-3">
          <button type="button" class="btn btn-primary btn-sm mr-2" data-toggle="modal" data-target="#addUser">
            <i class="fa fa-plus" aria-hidden="true"></i> Create Admin
          </button>
        </div>
        <div class="col-md-3">
          <form @submit.prevent="searchAdmin">
            <div class="input-group mb-3">
              <input type="text" v-model="form.name" class="form-control form-control-sm" placeholder="Search by name">
              <div class="input-group-append">
                <button class="btn btn-sm btn-success" type="submit" id="button-addon2">Search</button>
              </div>
            </div>
          </form>
        </div>
        <AddAdmin :toaster="toaster" />
      </div>
      <div class="container">
        <Table :data_user="listUsers"/>
      </div>
  </div>
</template>
<script>
import Title from '../../components/Title'
import Table from '../../components/TableUser'
import AddAdmin from '../../components/Main/Form/FormAddAdmin'
import Toaster from '../../components/Toaster'

export default {
  name : 'ContentUser',
  components : {
    Title,
    Table,
    AddAdmin,
    Toaster
  },
  created() {
    this.getDataAdmin()
  },
  computed : {
    listUsers(){
      return this.$store.state.listAdmin
    }
  },
  data(){
    return {
      toaster : null,
      form : {
        name : ''
      }
    }
  },
  methods : {
    getDataAdmin(){
      this.$store.dispatch('getAdmin')
    },
    searchAdmin(){
      this.$store.dispatch('getAdmin', { name : this.form.name })
    },
    successAlert(msg){
      this.toaster = msg
    }
  }
}
</script>

<style>

</style>