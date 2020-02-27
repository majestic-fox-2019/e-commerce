<template>
  <div class="container-fluid mt-4">
    <div class="col-md-10 mx-auto">
      <Title msg="Cart List" />
      <br>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Cart <span class="badge badge-danger">{{ countCart }}</span></a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <CartTable :carts="carts" :userId="userId" :token="isLoggedIn"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title'
import CartTable from '../components/CartTable'

export default {
  name: 'Cart',
  components: {
    Title,
    CartTable
  },
  data(){
    return {

    }
  },
  created(){
    this.getTransaction()
  },
  computed: {
    isLoggedIn:function() {
      return this.$store.state.isLoggedIn
    },
    userEmail: function() {
      return this.$store.state.userEmail
    },
    userId: function() {
      return this.$store.state.userId
    },
    carts: function(){
      return this.$store.state.carts
    },
    countCart: function(){
      return this.$store.state.countCart
    }
  },
  methods: {
    getTransaction(){
      this.$store.dispatch('getTransaction', { userId: this.userId, token: this.isLoggedIn })
    },
  }
}
</script>

<style scoped>

</style>