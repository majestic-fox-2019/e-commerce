<template>
  <div class="home">
    <Carousel />
    <v-container>
      <v-row>
        <v-col
          v-for="(category, i) in categories"
          :key="i"
          @click.prevent="categoryPage(category.name)"
        >
          <CategoryCard :category="category" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col
          lg="3"
          md="3"
          sm="6"
          xs="12"
          v-for="(product, i) in allProducts"
          :key="i"
        >
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import CategoryCard from '@/components/CategoryCard'
import ProductCard from '@/components/ProductCard'

export default {
  name: 'Home',
  data() {
    return {
      categories: [
        {
          name: 'Brass',
          image:
            "url('https://cpb-us-w2.wpmucdn.com/u.osu.edu/dist/3/29459/files/2016/09/Me-1zq3gik.jpg')"
        },
        {
          name: 'Battery',
          image:
            "url('https://assets.dci.org/5a5cd69b7ce1f708e87a9ae3_kFQktBkCCBe2-yR3gytdRwLdKTPLzxtL.jpg')"
        }
      ]
    }
  },
  components: {
    Carousel,
    ProductCard,
    CategoryCard
  },
  methods: {
    categoryPage(val) {
      this.$router.push('/category/' + val)
    }
  },
  computed: {
    allProducts() {
      return this.$store.state.allProducts
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_ALL_PRODUCTS')
  }
}
</script>
