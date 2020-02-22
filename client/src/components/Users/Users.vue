<template>
  <main class="page-content">
    <div class="container-fluid">
      <h2>Users</h2>
      <hr>
      <b-button size="sm" style="position:absolute" variant="primary" @click="modals = true; statusModal = 'add'"><i class="fa fa-plus"></i>&nbsp;Add User</b-button>
      <table-component
        name="user"
        :items="getUsers" 
        :fields="fieldUsers" 
        :per_page="perPageUsers"
        :filterIncludedFields="filterOnUsers"
        :busy="isBusyUsers"
        @setEditData="getEdit"
        @setEditPass="getEditPass"
        @setDeleteData="deleteUser"
      ></table-component>
    </div>
    <modal-user 
      name="Add User"
      :show="modals"
      :form="formUser"
      @setModal="setActiveModal"
      :status="statusModal"
    ></modal-user>
    <modal-pass
      name="Change Password"
      :show="modalsPass"
      :form="formUser"
      @setModal="setActiveModalPass"
    ></modal-pass>
  </main>
</template>

<script>
import axios from 'axios'
import TableComponent from '@/components/Tables/Tables'
import ModalUser from '@/components/Users/ModalUser'
import ModalPassword from '@/components/Users/ModalPass'
import { url } from '@/mixins/mixins'

export default {
  name: 'Users',
  mixins: [url],
  components: {
    'table-component' : TableComponent,
    'modal-user' : ModalUser,
    'modal-pass' : ModalPassword
  },
  data(){
    return {
      modals: false,
      modalsPass: false, 
      statusModal: null,
      formUser: {
        name: null,
        email: null,
        role: null,
        password: null
      },
      getIdUser:{
        id_user: null
      },
      isBusyUsers: false,
      totalRowsUsers: 1,
      perPageUsers: 5,
      filterOnUsers: [],
      fieldUsers: [
        'no',
        {key: 'name', label: 'Name', sortable: true, filterByFormatted: true},
        {key: 'email', label: 'Email', sortable: true, filterByFormatted: true},
        {key: 'role', label: 'Role', sortable: true, filterByFormatted: true},
        {key: 'createdAt', label:'Created Date', sortable: true, filterByFormatted: true},
        {key: 'updatedAt', label:'Updated Date', sortable: true, filterByFormatted: true},
        {key: 'action', label:'Action'}
      ],
    }
  },
  created(){
    this.getDataUsers()
  },
  computed: {
    getUsers(){
      return this.$store.state.users_dashboard
    }
  },
  methods: {
    setActiveModal(status){
      this.modals = status
      this.clearForm(this.formUser)
      this.clearForm(this.getIdUser)
    },
    setActiveModalPass(status){
      this.modalsPass = status
      this.clearForm(this.formUser)
      this.clearForm(this.getIdUser)
    },
    getDataUsers(){
      this.$store.dispatch('getUsersDashboard')
    },
    getEdit(data){
      this.modals = true
      this.statusModal = 'edit'
      this.formUser.name = data.name
      this.formUser.email = data.email
      this.formUser.role = data.role
      this.getIdUser.id_user = data.id
    },
    getEditPass(data){
      this.modalsPass = true
      this.getIdUser.id_user = data.id
    },
    addUser(){
      let self = this
      const token = localStorage.getItem('token')
      if(self.formUser.name === null || self.formUser.email === null || self.formUser.role === null || self.formUser.password === null){
        self.$vToastify.notifError('Form must be filled', "Failed!")
      }else{
        let dataAddUser = {
          name: self.formUser.name,
          email: self.formUser.email,
          role: self.formUser.role,
          password: self.formUser.password
        }
        axios.post(`${self.url}/admin/user`, dataAddUser, {
          headers: { Bearer : token }
        })
        .then(res => {
          self.$vToastify.notifSuccess('Add User Success!', "Yeah!")
          self.modals = false
          self.clearForm(self.formUser)
          self.getDataUsers()
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    },
    editUser(){
      let self = this
      const token = localStorage.getItem('token')
      if(self.formUser.name === null || self.formUser.email === null || self.formUser.role === null){
        self.$vToastify.notifError('Form must be filled', "Failed!")
      }else{
        let dataEditUser = {
          name: self.formUser.name,
          email: self.formUser.email,
          role: self.formUser.role
        }
        const id_user = self.getIdUser.id_user
        axios.put(`${self.url}/admin/user/${id_user}`, dataEditUser, {
          headers: { Bearer : token }
        })
        .then(res => {
          self.$vToastify.notifSuccess('Edit User Success!', "Yeah!")
          self.modals = false
          self.clearForm(self.formUser)
          self.getDataUsers()
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    },
    changePass(){
      let self = this
      const token = localStorage.getItem('token')
      if(self.formUser.password === null){
        self.$vToastify.notifError('Please input new password', "Failed!")
      }else{
        let dataPass = {
          password: self.formUser.password
        }
        const id_user = self.getIdUser.id_user
        axios.patch(`${self.url}/admin/user/changepassword/${id_user}`, dataPass, {
          headers: { Bearer : token }
        })
        .then(res => {
          self.$vToastify.notifSuccess('Edit User Success!', "Yeah!")
          self.modalsPass = false
          self.clearForm(self.formUser)
          self.clearForm(self.getIdUser)
          self.getDataUsers()
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    },
    deleteUser(data){
      let self = this
      const token = localStorage.getItem('token')
      self.$vToastify.prompt({
        title: "Delete Data",
        body: "Are you sure delete this data?",
        answers: { Yes: true, No: false }
      })
      .then(value => {
        if(value){
          axios.delete(`${self.url}/admin/user/${data.id}`, {
            headers: { Bearer : token }
          })
          .then(res => {
            self.$vToastify.notifSuccess('Delete User Success!', "Yeah!")
            self.getDataUsers()
          })
          .catch(err => {
            self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
          })
        }
      })
    },
    clearForm(form){
      for(let key in form){
        form[key] = null
      }
    }
  },
}
</script>

<style scoped>

</style>