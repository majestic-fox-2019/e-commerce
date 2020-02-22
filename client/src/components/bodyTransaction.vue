<template>
  <tr>
    <td>{{bodyTrans.Product.name}}</td>
    <td>
      <img :src="bodyTrans.Product.image_url" height="100" alt="product" />
    </td>
    <td>{{bodyTrans.User.name}}</td>
    <td>{{price}}</td>
    <td>{{dateNya}}</td>
  </tr>
</template>

<script>
export default {
  name: "bodyTransaction",
  props: ["bodyTrans"],
  computed: {
    price() {
      let angka = this.bodyTrans.totalPrice;
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
      let date = new Date(this.bodyTrans.updatedAt).toString().substr(0, 10);
      return date;
    }
  }
};
</script>

<style>
</style>