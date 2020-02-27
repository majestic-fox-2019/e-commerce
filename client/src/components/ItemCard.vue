<template>
  <b-row style="margin-left:10vw; margin-right:10vw; margin-top:10vh;">
    <b-col cols="3" v-for="(item, i) in items" :key="i">
      <b-card
        :title="item.name"
        :img-src="item.imageUrl"
        img-alt="ItemCardImage"
        img-top
        tag="ItemCardImage"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          <p>
            {{ item.category }}
          </p>
          <p>
            {{ item.stock }}
          </p>
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
