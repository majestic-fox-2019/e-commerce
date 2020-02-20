<template>
  <div>
    <v-row>
      <v-col md="2" sm="12" xs="12">
        <SidenavAdmin />
      </v-col>
      <v-col md="10" sm="12" xs="12" id="scrollable">
        <Loader v-show="loading" />
        <v-btn color="green" dark id="add-item" @click.stop="openDialog">
          <v-icon>mdi-plus</v-icon>
          <h3>Add new item</h3>
        </v-btn>
        <div v-if="products.length < 1">
          <h2 class="text-center mt-5">You dont have any product now</h2>
        </div>
        <v-row v-else id="table">
          <v-col md="6" v-for="(product, i) in products" :key="i">
            <ItemTable :product="product"
          /></v-col>
        </v-row>
        <ItemForm />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SidenavAdmin from '@/components/SidenavAdmin'
import ItemTable from '@/components/ItemTable'
import ItemForm from '@/components/ItemForm'
import Loader from '@/components/Loader'

export default {
  name: 'AdminPanel',
  data() {
    return {}
  },
  components: {
    SidenavAdmin,
    ItemTable,
    ItemForm,
    Loader
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    products() {
      return this.$store.state.myProducts
    }
  },
  methods: {
    openDialog() {
      this.$store.commit('DIALOG_CHANGE', true)
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_USER_PRODUCTS')
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (
        vm.$store.state.loginStatus === true &&
        vm.$store.state.userProfile.role === 'premium'
      ) {
        next()
      } else {
        next('/')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
div {
  margin: 0;
  padding: 0;
}
#scrollable {
  height: 93vh;
  padding: 20px;
  overflow-y: scroll;
}
#add-item {
  margin: 0 10px 10px 10px;
}
#table {
  height: 0px;
}
</style>
