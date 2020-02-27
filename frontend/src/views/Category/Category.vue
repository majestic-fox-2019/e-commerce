<template>
  <main>
    <div class="banner-category">
      <img src="@/assets/images/banner-cat.jpg">
    </div>
    <div class="container">
      <div class="content-category mt-5 mb-5">
        <b-row>
          <b-col md="2" class="mb-3mobile">
            <b-card header="FILTERS" align=left>
              <label class="title-filter">CATEGORIES</label>
              <span class="menu-category" v-for="cat in getCategories" :key="cat.id" @click="goToCategories(cat)">{{ cat.name }}</span>
            </b-card>
          </b-col>
          <b-col md="10">
            <router-view />
          </b-col>
        </b-row>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return {

    }
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
    goToCategories(cat){
      this.$router.push({ name: `CategoryName`, params: { catname: cat.name, id: cat.id }}).catch(err => {})
    }
  },
}
</script>
