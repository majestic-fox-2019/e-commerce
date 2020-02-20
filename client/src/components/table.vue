<template>
<div>
        <table class="table ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="el in data" :key="el.id">
              <th scope="row">{{el.id}}</th>
              <td>{{el.name}}</td>
              <td>{{el.stock}}</td>
              <td>{{formatnumber(el.price)}}</td>
              <button type="button" class="btn btn-primary">detail</button>
            </tr>
          </tbody>
        </table>
</div>
</template>

<script>
export default {
  name: 'addTable',
  props: ['data'],
  methods: {
    formatnumber(int) {
      const num = new Intl.NumberFormat().format(int);
      return `Rp. ${num}`;
    },
  },
};
</script>

<style>

</style>
