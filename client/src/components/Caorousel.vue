<template>
  <div class="mt-3">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      height="300"
      img-width="1024"
      img-height="280"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        style="max-height: 300px"
        img-src="https://arx.co.id/wp-content/uploads/sites/2/2018/10/geforce-rtx-2080-ti-social-2048x1024.jpg"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide
        style="max-height: 300px"
        img-src="https://www.evetech.co.za/repository/ProductImages/asus-rog-swift-27-inch-pg27vq-165hz-curved-gaming-monitor-730px-v1.jpg"
      ></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide
        style="max-height: 300px"
        img-src="https://i.ytimg.com/vi/Wl6khYp5NCM/maxresdefault.jpg"
      ></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <!-- <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
            a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
          </p>
      </b-carousel-slide>-->
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style>
</style>