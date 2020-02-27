<template>
  <b-card-group deck>
    <b-card
      @click.prevent="goToDetail(content.id)"
      style="background-color: black;"
      :img-src="content.image_url"
      img-height="250"
      img-alt="Image"
      img-top
    >
      <h4
        style="white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;"
      >{{content.name}}</h4>
      <b-card-text>Stock : {{content.stock}}</b-card-text>
      <b-card-text>Price : {{fixedPrice}}</b-card-text>
      <button type="button" class="btn btn-danger">Add To Cart</button>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  props: ["content"],
  computed: {
    id() {
      return String(this.content.id);
    },
    fixedPrice() {
      let bilangan = this.content.price;

      let number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

      if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }
      return `Rp ${rupiah}`;
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ path: `/${id}` });
    }
  }
};
</script>

<style>
</style>