<template>
  <b-modal
    v-model="show" 
    size="lg" 
    :title="name"
    no-close-on-backdrop 
    no-close-on-esc 
    hide-header-close>
    <b-form>
      <b-row class="my-1">
        <b-col :sm="status === 'add' ? 6 : 12">
          <b-form-group>
            <label for="name">Name</label>
            <b-form-input
              id="name"
              type="text"
              placeholder="Your full name"
              v-model="form.name"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6" v-if="status === 'add'">
          <b-form-group>
            <label for="password">Password</label>
            <b-form-input
              id="password"
              type="password"
              placeholder="Your password"
              v-model="form.password"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group>
            <label for="email">Email</label>
            <b-form-input
              id="email"
              type="email"
              placeholder="anov@gmail.com"
              v-model="form.email"
              :disabled="status === 'edit'"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group>
            <label for="role">Role</label>
            <b-form-select 
              id="role"
              v-model="form.role">
              <b-form-select-option :value="null" disabled hidden>Please select role</b-form-select-option>
              <b-form-select-option v-for="(role, idx) in roles" :key="idx" :value="role.value">{{ role.text }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="secondary" size="sm" class="mr-1" @click="setCloseModal(false)">Close</b-button>
        <b-button v-if="status === 'add'" variant="primary" size="sm" @click="goAddUser">Add User</b-button>
        <b-button v-if="status === 'edit'" variant="primary" size="sm" @click="goEditUser">Edit User</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['name', 'show', 'form', 'status'],
  data(){
    return {
      roles: [
        { text: 'Superadmin', value: 'superadmin' },
        { text: 'Admin', value: 'admin' }
      ]
    }
  },
  methods: {
    goAddUser(){
      this.$parent.addUser()
    },
    goEditUser(){
      this.$parent.editUser()
    },
    setCloseModal(stat){
      this.$emit('setModal', stat)
    }
  },
}
</script>

<style scoped>

</style>