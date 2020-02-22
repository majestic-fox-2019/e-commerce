<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <CategoryCard
            v-if="$route.params.category == 'Brass'"
            :category="categories[0]"
          />
          <CategoryCard v-else :category="categories[1]" />
        </v-col>
        <v-col
          lg="3"
          md="3"
          sm="6"
          xs="12"
          v-for="(product, i) in products"
          :key="i"
        >
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CategoryCard from '@/components/CategoryCard'
import ProductCard from '@/components/ProductCard'

export default {
  name: 'CategoryPage',
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
    CategoryCard,
    ProductCard
  },
  computed: {
    products() {
      console.log(this.$store.state.allProducts)
      return this.$store.state.allProducts
    }
  },
  mounted() {
    const category = this.$route.params.category
    console.log(category)
    this.$store.dispatch('FETCH_CATEGORY_PRODUCTS', category)
  }
}
</script>

<style lang="cass" scoped></style>
