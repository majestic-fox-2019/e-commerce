<template>
  <div class="table-users">
    <button
      data-toggle="modal"
      data-target="#addProduct"
      class="text-white py-1 px-3 border-b-4 rounded create-product"
    >
      <i class="fas fa-plus"></i> Create Product
    </button>
    <table cellspacing="0">
      <tr>
        <th>ID</th>
        <th width="100">Image</th>
        <th>Name</th>
        <th>Stock</th>
        <th>Price</th>
        <th width="250">Description</th>
        <th>Category</th>
        <th>Action</th>
      </tr>

      <tr v-for="(product, index) in this.$store.state.productAdmin" :key="index">
        <td>{{product.id}}</td>
        <td>
          <img :src="product.image_url" alt />
        </td>
        <td>
          <p class="text-panjang">{{product.name}}</p>
        </td>
        <td>{{product.stock}}</td>
        <td>Rp. {{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</td>
        <td>
          <p class="text-panjang">{{product.description}}</p>
        </td>
        <td style="text-align: center;">{{product.category}}</td>
        <td style="display: flex; justify-content: space-around;">
          <button
            @click="getOneProduct(product.id)"
            data-toggle="modal"
            data-target="#editProduct"
            class="text-white py-1 px-3 border-b-4 rounded edit-btn"
          >
            <i class="far fa-edit"></i>
          </button>
          <button
            @click="removeProduct(product.id)"
            class="text-white py-1 px-3 border-b-4 rounded remove-btn"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    getOneProduct(id) {
      this.$store.dispatch("findOneProduct", id);
    },
    removeProduct(id) {
      this.$store.dispatch("removeProduct", id);
    }
  }
};
</script>

<style lang="scss" scoped>
$baseColor: #937039;
$borderRadius: 10px;
$imageBig: 100px;
$imageSmall: 60px;
$padding: 10px;

body {
  background-color: lighten($baseColor, 30%);
  * {
    box-sizing: border-box;
  }
}

.text-panjang {
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-panjang:hover {
  overflow: visible;
}

.remove-btn {
  background-color: rgb(255, 71, 71);
  outline: none;
}

.create-product {
  background-color: #ee4d2d;
  outline: none;
  outline: none;
  position: absolute;
  margin-top: 2%;
  margin-left: -14%;
}

.edit-btn {
  background-color: rgb(0, 225, 255);
  outline: none;
}

.header {
  background-color: darken($baseColor, 5%);
  color: white;
  font-size: 1.5em;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
}

img {
  border-radius: 50%;
  height: $imageSmall;
  width: $imageSmall;
}

.table-users {
  border-radius: $borderRadius;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  max-width: calc(100% - 2em);
  margin-left: 15%;
  margin-top: 7%;
  overflow: hidden;
  width: 80%;
}

table {
  width: 100%;

  td,
  th {
    color: darken($baseColor, 10%);
    padding: $padding;
    text-align: center;
  }

  td {
    text-align: center;
    vertical-align: middle;

    &:last-child {
      font-size: 0.95em;
      line-height: 1.4;
      text-align: left;
    }
  }

  th {
    background-color: lighten($baseColor, 50%);
    font-weight: 300;
  }

  tr {
    &:nth-child(2n) {
      background-color: white;
    }
    &:nth-child(2n + 1) {
      background-color: lighten($baseColor, 55%);
    }
  }
}

@media screen and (max-width: 700px) {
  table,
  tr,
  td {
    display: block;
  }

  td {
    &:first-child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: $imageBig;
    }

    &:not(:first-child) {
      clear: both;
      margin-left: $imageBig;
      padding: 4px 20px 4px 90px;
      position: relative;
      text-align: left;

      &:before {
        color: lighten($baseColor, 30%);
        content: "";
        display: block;
        left: 0;
        position: absolute;
      }
    }
  }

  tr {
    padding: $padding 0;
    position: relative;
    &:first-child {
      display: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .header {
    background-color: transparent;
    color: lighten($baseColor, 60%);
    font-size: 2em;
    font-weight: 700;
    padding: 0;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }

  img {
    border: 3px solid;
    border-color: lighten($baseColor, 50%);
    height: $imageBig;
    margin: 0.5rem 0;
    width: $imageBig;
  }

  td {
    &:first-child {
      background-color: lighten($baseColor, 45%);
      border-bottom: 1px solid lighten($baseColor, 30%);
      border-radius: $borderRadius $borderRadius 0 0;
      position: relative;
      top: 0;
      transform: translateY(0);
      width: 100%;
    }

    &:not(:first-child) {
      margin: 0;
      padding: 5px 1em;
      width: 100%;

      &:before {
        font-size: 0.8em;
        padding-top: 0.3em;
        position: relative;
      }
    }

    &:last-child {
      padding-bottom: 1rem !important;
    }
  }

  tr {
    background-color: white !important;
    border: 1px solid lighten($baseColor, 20%);
    border-radius: $borderRadius;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    margin: 0.5rem 0;
    padding: 0;
  }

  .table-users {
    border: none;
    box-shadow: none;
    overflow: visible;
  }
}
</style>