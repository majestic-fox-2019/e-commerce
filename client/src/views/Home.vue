<template>
  <div class="q-pa-lg">
    <q-card class="bg-banner">
      <Carousel />
    </q-card>

    <!-- Category -->
    <div
      class="row flex justify-around q-mt-md bg-teal-1 q-py-md rounded-borders"
    >
      <div class="col-12 q-mb-md">
        <h3 class="q-pa-none text-center text-weight-bold">Kategori</h3>
        <q-separator />
      </div>
      <q-card
        class="col-2 own-card"
        v-for="item in category.options"
        :key="item.name"
        @click="detail(item.id)"
      >
        <q-img :src="item.image" basic style="cursor: pointer;">
          <div
            class="absolute-bottom text-subtitle2 text-center text-weight-bold "
          >
            {{ item.name }}
          </div>
        </q-img>
      </q-card>
    </div>
    <!-- End of category -->

    <q-card class="bg-teal-1 row flex q-mt-md q-pa-md justify-evenly">
      <div class="col-12 q-mb-md q-pa-none">
        <h3 class="text-weight-bold text-center">{{ groupBy.name }}</h3>
        <q-separator />
      </div>
      <!-- Product card -->
      <q-card
        class="col-2 own-card q-ma-md rounded"
        style="cursor:pointer;"
        v-for="product in products"
        :key="product.id"
      >
        <q-img :src="product.image_url" basic>
          <div class="absolute-bottom">
            {{ product.price }}
          </div>
        </q-img>

        <q-card-section class="ellipsis inline">
          {{ product.name }}
        </q-card-section>
      </q-card>
      <!-- End of product card -->
      <!-- <pre>{{ products }}</pre> -->
    </q-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/User/Carousel'

export default {
  name: 'Home',
  components: {
    Carousel
  },
  created() {
    this.$store.dispatch('GET_ALL_PRODUCT_LIST')
  },
  data() {
    return {
      groupBy: {
        name: 'Semua Produk',
        type: 'all'
      },
      category: {
        options: [
          {
            name: 'Desktop',
            image:
              'https://static.bmdstatic.com/pk/product/medium/5d2d542e6c7f2.jpg'
          },
          {
            name: 'Laptop',
            image:
              'https://static.bmdstatic.com/pk/product/medium/5e0576f8a2057.jpg'
          },
          {
            name: 'Monitor',
            image:
              'https://static.bmdstatic.com/pk/product/medium/5c5a61dcd8da0.jpg'
          },
          {
            name: 'Keyboard',
            image:
              'https://static.bmdstatic.com/pk/product/medium/5a434bddb76b9.jpg'
          },
          {
            name: 'Mouse',
            image:
              'https://static.bmdstatic.com/pk/product/medium/5c63df56bcabd.jpg'
          }
        ]
      }
    }
  },
  computed: {
    products() {
      return this.$store.state.productList
    }
  },
  methods: {
    detail(productId) {}
  }
}
</script>

<style scoped>
.bg-banner {
  background-color: rgba(76, 0, 130, 0.335);
}

.own-card {
  transition: 0.7s !important;
  opacity: 90%;
}

.own-card:hover {
  opacity: unset;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
</style>
