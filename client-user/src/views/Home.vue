<template>
  <v-item-group>
    <v-container>
      <h1 v-if="banners.length > 0">New Items</h1>
      <carousel
        v-if="banners.length > 0"
        autoplay
        :perPage="4"
        scrollPerPage
        :paginationEnabled="false"
        :speed="2000"
        loop>
          <slide v-for="(banner,i) in banners" :key="i" >
            <v-img 
            width="100%"
            height="100%"
            :src="banner.image_url+'?'+`${Date.now()}`"
            >
          </slide>
        </carousel>
      <v-row class="pt-5">
        <v-chip
          class="ma-2"
          :color="active ? 'primary' : 'orange'"
          text-color="white"
          filter
          :input-value="active ? false : true"
          :to="{name:'Home'}"
        >
          All
        </v-chip>
        <v-chip
          v-for="category in categories"
          :key=category.id
          class="ma-2"
          :color="active===category.name ? 'orange' : 'primary'"
          text-color="white"
          filter
          :to="{name:'Home.id',params:{id:category.name}}"
          :input-value="active===category.name ? true : false"
        >
          {{category.name}}
        </v-chip>
      </v-row>
      <router-view @openLogin="$emit('openLogin')"></router-view>
    </v-container>
  </v-item-group>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Carousel,
    Slide
  },
  props:['id'],
  data() {
    return {
      active:null,
      banners : []
    }
  },
  created() {
    this.active = this.id
    this.loadCategory()
    this.getBanner()
  },
  methods: {
    loadCategory() {
      this.$store.dispatch('getCategories')
    },
    getBanner() {
      this.$http({
        method:"get",
        url:'product/banner/5',
      })
      .then(({data}) => {
        this.banners = data
      })
      .catch(err => {
        this.$toast.fire(
          {
            title: 'Error',
            text:  err.response.data,
            icon: 'error',
          },
        );
      })
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
  },
  watch: {
    id() {
      this.active = this.id
    }
  }
}
</script>

<style>
</style>