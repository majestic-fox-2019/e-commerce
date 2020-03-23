<template>
  <tr>
    <td>{{detailHistoryBelanja.Product.name}}</td>
    <td>
      <img :src="detailHistoryBelanja.Product.image_url" height="100" alt="product" />
    </td>
    <td>{{price}}</td>
    <td>{{dateNya}}</td>
    <td>
      <!-- <a :href=></a> -->
      <router-link :to="'/detail/'+detailHistoryBelanja.Product.id">Give Review</router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: "bodyBelanja",
  props: ["detailHistoryBelanja"],
  computed: {
    price() {
      let angka = this.detailHistoryBelanja.totalPrice;
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
    },
    dateNya() {
      let date = new Date(this.detailHistoryBelanja.updatedAt)
        .toString()
        .substr(0, 10);
      return date;
    }
  }
};
</script>

<style>
</style>