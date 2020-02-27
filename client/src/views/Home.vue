<template>
  <div class="home">
    <b-jumbotron
      header="Gameshop"
      lead="Play Hard Work Hard"
    >
      <p>See our Products</p>
      <b-button variant="primary" to="/products">More</b-button>
    </b-jumbotron>
    <b-container :fluid="true">
      <h2 class="text-center">Top Games</h2>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          caption="Nier Automata"
          img-src="https://images7.alphacoders.com/838/thumb-1920-838020.png"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="God fo War (2018)"
          img-src="https://i.ytimg.com/vi/Uev7TBs1Y0A/maxresdefault.jpg"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Destiny 2"
          img-src="https://steamcdn-a.akamaihd.net/steam/apps/1085660/header.jpg?t=1579214430"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Sekiro: Shadow Die Twice"
          img-src="https://steamcdn-a.akamaihd.net/steam/apps/814380/header.jpg?t=1576898087"
        ></b-carousel-slide>
      </b-carousel>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  created() {
  }
};
</script>
