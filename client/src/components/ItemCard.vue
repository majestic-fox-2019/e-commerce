<template>
  <b-row style="margin-left:10vw; margin-right:10vw; margin-top:10vh;">
    <b-col cols="3" v-for="i in items" :key="i">
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'itemCard',
  data() {
    return {}
  },
  props: ['items']
}
</script>

<style scoped></style>
