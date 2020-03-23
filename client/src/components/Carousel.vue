<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="100"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/4dc58370704977.5bac0fd214367.jpg"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/4c9db570704977.5bac0fd213cc0.jpg"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            src="https://i.pinimg.com/originals/a0/04/7c/a0047c6fbe7355ce655176da3b4cba5e.jpg"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            src="https://i.pinimg.com/originals/7c/e0/b8/7ce0b8145c2a8150f4b971d18fc48d5c.jpg"
            alt="image slot"
          />
        </template>
        >
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://s3.amazonaws.com/hartlyfashionsmedia/wp-content/uploads/2018/06/12124922/SHOP-OUR-LATEST-ARRIVALS-BANNER.png"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  },
  created() {}
};
</script>

<style scoped>
img {
  min-height: 500px;
  max-height: 500px;
}
</style>