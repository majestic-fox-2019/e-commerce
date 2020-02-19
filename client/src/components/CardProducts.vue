<template>
  <!-- <div class="col"></div> -->
  <div class="col-3 mt-2 cardIni" @click="goToDetail">
    <b-card
      :title="product.name"
      img-height="250"
      img-width="250"
      :img-src="product.image_url"
      img-alt="Image"
      img-top
    >
      <b-card-text>
        <div class="row">
          <div class="col">
            <i class="el-icon-s-shop styleIcon"></i>
            {{shop}}
          </div>
          <div class="col">
            <i class="el-icon-discount"></i>
            {{price}}
          </div>
        </div>
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated {{updated}}</small>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["product"],
  mounted() {
    // console.log(this.product, "<<");
  },
  methods: {
    goToDetail() {
      this.$router.push(`/detail/${this.product.id}`);
    }
  },
  computed: {
    shop() {
      if (this.product.User.role == "admin") {
        return "Official Shop";
      } else {
        return this.product.User.name;
      }
    },
    updated() {
      let date = new Date(this.product.updatedAt).toString().substr(0, 10);
      return date;
    },
    price() {
      let angka = this.product.price;
      var rupiah = "";
      var angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("") +
        ",00"
      );
    }
  }
};
</script>

<style scoped>
.cardku {
  height: 40px;
}

.cardIni:hover {
  border: 5px solid coral;
  cursor: pointer;
}
</style>