<template>
  <div class="home">
    <carousel 
      :autoplay="true"
      :items="1"
      :nav="false">
      <img src="@/assets/images/banner1.jpg">
      <img src="@/assets/images/banner2.jpg">
      <img src="@/assets/images/banner3.jpg">
    </carousel>
    <div class="container">
      <div class="category">
        <h3 class="title-section">KATEGORI</h3>
        <b-row>
          <b-col md="4" v-for="cat in getCategories" :key="cat.id">
            <b-card class="card-category" @click="getToCategory(cat)">
              <h4 class="text-category">{{ cat.name }}</h4>
              <b-card-text>
                <img src="@/assets/icons/1.png">
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel2'
export default {
  name: 'Home',
  components: {
    carousel
  },
  data(){
    return{}
  },
  created(){
    this.getAllCategories()
  },
  computed:{
    getCategories(){
      return this.$store.state.categories
    }
  },
  methods: {
    getAllCategories(){
      this.$store.dispatch('getCategories')
    },
    getToCategory(cat){
      this.$router.push({ name: `CategoryName`, params: { catname: cat.name, id: cat.id }}).catch(err => {})
    }
  }
}
</script>
