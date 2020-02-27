<template>
  <main class="page-content">
    <div class="container-fluid">
      <h2>Categories</h2>
      <hr>
      <b-button size="sm" style="position:absolute" variant="primary" @click="modals = true; statusModal = 'add'"><i class="fa fa-plus"></i>&nbsp;Add Category</b-button>
      <table-component
        name="categories"
        :items="getCategories" 
        :fields="fieldCategories" 
        :per_page="perPageCategories"
        :filterIncludedFields="filterOnCategories"
        @setEditData="getEdit"
        @setDeleteData="deleteCategory"
      ></table-component>
    </div>
    <modal-category 
      name="Add Category"
      :show="modals"
      :form="formCategory"
      @setModal="setActiveModal"
      :status="statusModal"
    ></modal-category>
  </main>
</template>

<script>
import axios from 'axios'
import TableComponent from '@/components/Tables/Tables'
import ModalCategory from '@/components/Categories/ModalCategory'
import { url } from '@/mixins/mixins'

export default {
  name: 'Categories',
  mixins: [url],
  components: {
    'table-component' : TableComponent,
    'modal-category' : ModalCategory
  },
  data(){
    return {
      modals: false,
      statusModal: null,
      formCategory: {
        name: null
      },
      getIdCategory:{
        id_category: null
      },
      totalRowsCategories: 1,
      perPageCategories: 5,
      filterOnCategories: [],
      fieldCategories: [
        'no',
        {key: 'name', label: 'Name Category', sortable: true, filterByFormatted: true},
        {key: 'createdAt', label:'Created Date', sortable: true, filterByFormatted: true},
        {key: 'updatedAt', label:'Updated Date', sortable: true, filterByFormatted: true},
        {key: 'action', label:'Action'}
      ],
    }
  },
  created(){
    this.getDataCategories()
  },
  computed: {
    getCategories(){
      return this.$store.state.categories_dashboard
    }
  },
  methods: {
    setActiveModal(status){
      this.modals = status
      this.clearForm(this.formCategory)
      this.clearForm(this.getIdCategory)
    },
    getDataCategories(){
      this.$store.dispatch('getCategoriesDashboard')
    },
    getEdit(data){
      this.modals = true
      this.statusModal = 'edit'
      this.formCategory.name = data.name
      this.getIdCategory.id_category = data.id
    },
    addCategory(){
      let self = this
      const token = localStorage.getItem('token')
      if(self.formCategory.name === null){
        self.$vToastify.notifError('Category must be filled', "Failed!")
      }else{
        let dataAddCategory = {
          name: self.formCategory.name
        }
        axios.post(`${self.url}/admin/category`, dataAddCategory, {
          headers: { Bearer : token }
        })
        .then(res => {
          self.$vToastify.notifSuccess('Add Category Success!', "Yeah!")
          self.modals = false
          self.clearForm(self.formCategory)
          self.getDataCategories()
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    },
    editCategory(){
      let self = this
      const token = localStorage.getItem('token')
      if(self.formCategory.name === null){
        self.$vToastify.notifError('Category must be filled', "Failed!")  
      }else{
        let dataEditCategory = {
          name: self.formCategory.name,
          updatedAt: Date.now()
        }
        const id_category = self.getIdCategory.id_category
        axios.put(`${self.url}/admin/category/${id_category}`, dataEditCategory, {
          headers : { Bearer : token }
        })
        .then(res => {
          self.$vToastify.notifSuccess('Edit Category Success!', "Yeah!")
          self.modals = false
          self.clearForm(self.formCategory)
          self.getDataCategories()
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    },
    deleteCategory(data){
      let self = this
      const token = localStorage.getItem('token')
      self.$vToastify.prompt({
        title: "Delete Data",
        body: "Are you sure delete this data?",
        answers: { Yes: true, No: false }
      })
      .then(value => {
        if(value){
          axios.delete(`${self.url}/admin/category/${data.id}`, {
            headers: { Bearer : token }
          })
          .then(res => {
            self.$vToastify.notifSuccess('Delete Category Success!', "Yeah!")
            self.getDataCategories()
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