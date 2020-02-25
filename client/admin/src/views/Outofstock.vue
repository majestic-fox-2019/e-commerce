<template>
  <div class="container mt-4">
     <b-table dark striped hover
      :items="loadData"
      :fields="fields"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
    >
    <template v-slot:cell(actions)="row">
      <b-button size="sm" variant="info" class="mr-1" @click="showform(row)">Edit Stock</b-button>
    </template>
    </b-table>
     <formedit :dataedit="selected"
      @close-form="showform" @cancle-edit="closeform"
      @empty-selected="emptyselected"
      v-if="showedit" ></formedit>
  </div>
</template>

<script>
import formedit from '@/components/formedit.vue';

export default {
  data() {
    return {
      showedit: false,
      selected: {},
      sortDesc: false,
      fields: [
        { key: 'id' },
        { key: 'name', sortable: true },
        { key: 'stock' },
        {
          key: 'price',
          sortable: true,
          formatter: (value) => `Rp. ${new Intl.NumberFormat().format(value)} `,
        },
        { key: 'actions', label: 'Actions' },
      ],
    };
  },
  components: {
    formedit,
  },
  created() {
    this.$store.dispatch('loadData');
  },
  computed: {
    loadData() {
      return this.$store.state.emptyStock;
    },
  },
  methods: {
    closeform() {
      this.showedit = !this.showedit;
    },
    showform(data) {
      console.log(data);
      this.selected = data.item;
      this.showedit = !this.showedit;
    },
    emptyselected() {
      this.selected = false;
      this.showedit = false;
    },
  },
};
</script>

<style>
 .table .btn {
   margin: 1px;
 }
 .container-fluid, .container-sm, .container-md, .container-lg, .container-xl {
    padding: 0;
}
</style>
