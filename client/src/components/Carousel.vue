<template>
  <v-carousel cycle height="300" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(slide, i) in images" :key="i">
      <v-img :src="slide" height="100%"> </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('../assets/yamahabrass.jpg'),
        require('../assets/yamahabattery.jpg'),
        require('../assets/yamahabrass2.jpg'),
        require('../assets/yamahabattery2.jpg')
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
    }
  }
}
</script>
