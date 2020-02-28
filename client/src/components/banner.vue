<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    >
      <!-- <v-sheet
        height="100%"
        :src="item.src"
      > -->
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
        </v-row>
      <!-- </v-sheet> -->
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://lh3.googleusercontent.com/proxy/NHSEz93ukynAS3x9mGlvNaS1QuYenETrw0nFxrezPKniZHKIcsqHcHkNaVf-Ui3-fakHx-hGuKWS_DeJrqkw86Zbt2emV8L-Dcm9b3xqYTRyq0QU',
        },
        {
          src: 'https://cdn-u1-gnfi.imgix.net/post/large-kopitop-dc4a4d40204ecca715da1498685d5f50.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped>
v-carousel-item {
  height: auto;
  width: auto;
}
</style>
