<template>
  <b-modal 
    v-model="show" 
    :title="name" 
    no-close-on-backdrop 
    no-close-on-esc 
    hide-header-close>
    <b-form>
      <b-form-group>
        <label for="password">New Password</label>
        <b-form-input
          id="name"
          type="password"
          placeholder="New password"
          v-model="form.password"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="secondary" size="sm" class="mr-1" @click="setCloseModal(false)">Close</b-button>
        <b-button variant="primary" size="sm" @click="goChangePass">Change Password</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['name', 'show', 'form'],
  data(){
    return {}
  },
  methods: {
    goChangePass(){
      this.$parent.changePass()
    },
    setCloseModal(stat){
      this.$emit('setModal', stat)
    }
  },
}
</script>

<style scoped>

</style>