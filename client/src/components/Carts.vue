<template>
  <div>
    <v-simple-table fixed-header height="500px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Category</th>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn
      block
      color="primary"
      class="ma-2 white--text"
      @click="loader = 'loading3'"
    >
      Checkout
      <v-icon right dark>mdi-credit-card-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
