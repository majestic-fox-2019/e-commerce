<template>
  <div class="home">
    <Carousel />
    <v-container>
      <v-row>
        <v-col>
          <CategoryCard />
        </v-col>
        <v-col>
          <CategoryCard />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import CategoryCard from '@/components/CategoryCard'

export default {
  name: 'Home',
  components: {
    Carousel,
    CategoryCard
  }
}
</script>
