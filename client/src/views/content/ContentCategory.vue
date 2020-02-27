<template>
  <div>
      <Title msg="Content Category"/>
          <router-link :to="{ name : 'AddCategory' }" type="button" class="btn btn-primary btn-sm mr-2">
            <i class="fa fa-plus" aria-hidden="true"></i> Add Category
          </router-link>
      <TableCategory class="mt-2" :categories="categories" />
  </div>
</template>
<script>
import Title from '../../components/Title'
import TableCategory from '../../components/TableCategory'

export default {
  name : 'ContentCategory',
  components : {
    Title,
    TableCategory
  },
  created(){
    this.getCategory()
  },
  computed: {
    categories: function(){
      return this.$store.state.listCategory
    }
  },
  methods : {
    getCategory(){
      this.$store.dispatch('getCategory')
    }
  }
}
</script>

<style>

</style>