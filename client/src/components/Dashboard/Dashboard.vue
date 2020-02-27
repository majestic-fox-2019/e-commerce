<template>
  <main class="page-content">
    <div class="container-fluid">
      <h2>Dashboard</h2>
      <hr>
      <b-row>
        <b-col md="4">
          <card-dashboard name="Users" :data="getUsers"></card-dashboard>
        </b-col>
        <b-col md="4">
          <card-dashboard name="Categories" :data="getCategories"></card-dashboard>
        </b-col>
        <b-col md="4">
          <card-dashboard name="Products" :data="getProducts"></card-dashboard>
        </b-col>
      </b-row>
    </div>
  </main>
</template>

<script>
import CardDashboard from '@/components/Dashboard/CardDashboard'
export default {
  components:{
    'card-dashboard': CardDashboard
  },
  data(){
    return {}
  },
  created(){
    this.getDataUsers()
    this.getDataProducts()
    this.getDataCategories()
  },
  computed: {
    getUsers(){
      return this.$store.state.users_dashboard
    },
    getProducts(){
      return this.$store.state.products_dashboard
    },
    getCategories(){
      return this.$store.state.categories_dashboard
    }
  },
  methods: {
    getDataUsers(){
      this.$store.dispatch('getUsersDashboard')
    },
    getDataProducts(){
      this.$store.dispatch('getProductsDashboard')
    },
    getDataCategories(){
      this.$store.dispatch('getCategoriesDashboard')
    },
  },
}
</script>

<style scoped>

</style>