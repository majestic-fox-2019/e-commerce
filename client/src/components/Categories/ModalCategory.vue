<template>
  <b-modal 
    v-model="show" 
    :title="name"
    no-close-on-backdrop 
    no-close-on-esc 
    hide-header-close>
    <b-form>
      <b-form-group label="Category Name" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Category name"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="secondary" size="sm" class="mr-1" @click="setCloseModal(false)">Close</b-button>
        <b-button v-if="status === 'add'" variant="primary" size="sm" @click="goAddCategory">Add Category</b-button>
        <b-button v-if="status === 'edit'" variant="primary" size="sm" @click="goEditCategory">Edit Category</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['name', 'show', 'form', 'status'],
  methods: {
    goAddCategory(){
      this.$parent.addCategory()
    },
    goEditCategory(){
      this.$parent.editCategory()
    },
    setCloseModal(stat){
      this.$emit('setModal', stat)
    }
  },
}
</script>

<style scoped>

</style>