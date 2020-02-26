<template>
  <div class="q-pa-lg">
    <q-card class="bg-banner">
      <Carousel />
    </q-card>

    <!-- Category -->
    <div
      class="row flex justify-around q-mt-md bg-teal-1 q-py-md rounded-borders"
    >
      <h4
        class="q-pa-none text-center text-weight-bold flex justify-center content-center items-center"
      >
        Kategori
      </h4>
      <q-separator vertical inset />
      <q-card
        class="col-2 own-card"
        v-for="item in category.options"
        :key="item.name"
        @click="groupBy = item.name"
        style="width: 10%;"
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
        <h3 class="text-weight-bold text-center q-pa-none">{{ groupBy }}</h3>
        <div class="flex justify-end full-width">
          <q-select
            class="q-mb-md"
            bg-color="bg-indigo-5"
            style="width: 10rem;"
            v-model="groupBy"
            outlined
            :options="options"
            label="Kategori"
          />
        </div>
        <q-separator />
      </div>
      <!-- Product card -->
      <div class="row justify-center q-mb-xl">
        <q-intersection
          v-for="product in products"
          :key="product.id"
          once
          transition="scale"
          class="example-item q-my-md"
        >
          <ProductCard class="" :product="product" />
        </q-intersection>
      </div>
      <!-- End of product card -->
    </q-card>
  </div>
</template>

<script>
import ProductCard from '../components/User/ProductCard'
import Carousel from '../components/User/Carousel'

export default {
  name: 'Home',
  components: {
    Carousel,
    ProductCard
  },
  created() {
    this.getAllProducts()
  },
  data() {
    return {
      groupBy: 'Semua Produk',
      options: [
        'Semua Produk',
        'Desktop',
        'Laptop',
        'Keyboard',
        'Monitor',
        'Mouse'
      ],
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
      if (this.groupBy && this.groupBy != 'Semua Produk') {
        return this.$store.state.productList.filter(
          (el) => el.category == this.groupBy
        )
      } else {
        return this.$store.state.productList
      }
    }
  },
  methods: {
    getAllProducts() {
      this.$store.dispatch('GET_ALL_PRODUCT_LIST')
    }
  }
}
</script>

<style scoped>
.bg-banner {
  background-color: rgba(76, 0, 130, 0.335);
}

.example-item {
  height: 290px;
  width: 290px;
}

.own-card {
  transition: 0.7s !important;
}

.own-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
</style>
