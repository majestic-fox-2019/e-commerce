<template>
<div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
  >
    <b-carousel-slide
      caption="First slide"
      img-src="https://www.nordicstylemag.com/wp-content/uploads/2015/04/pas-normal-studios-cycling-clothing-10-960x640.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://thumbnails.rennrad-news.de/cache/1170_auto_1_1_0/5d/aHR0cHM6Ly9mb3Rvcy5yZW5ucmFkLW5ld3MuZGUvZjMvNC80NzUvNDc1MTg1LW8xenQ1bjU5NWY4Yy1fcjh2NzY2NS1vcmlnaW5hbC5qcGc.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://cdn-cyclingtips.pressidium.com/wp-content/uploads/2018/01/Zipp-454-NSW-wheelset-14.jpg"
    >
    <h1>TEST</h1></b-carousel-slide>
  </b-carousel>
</div>
</template>

<script>
export default {
  name: 'carousel'
}
</script>

<style scope>
  .img-fluid{

  height: 60vh;
  object-fit: cover;
  object-position: center; /* Center the image within the element */
  width: 100%;
  height: 90vh;
  margin-bottom: 1rem;
}
</style>
