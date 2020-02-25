<template>
<div>
  <div class="col-8 d-flex justify-content-between my-2">
  <h2>All List Of Product</h2>
  <div class="d-flex">
    <div class="btn-group mx-2">
</div>
  <button @click="showfrom" type="button" class="btn btn-success"><span>
    <i class="fa fa-plus-square" style="font-size:20px;color:white"></i>
    </span> Add New </button>
  </div>
  </div>
   <div class="d-flex">
     <div class="col-8">
       <!-- <tableProduct @selected-data="selectedData" :data="loadData" ></tableProduct> -->
          <b-table dark striped hover
      :items="loadData"
      :fields="fields"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
    >
    <template v-slot:cell(actions)="row">
      <b-button size="sm" class="mr-1" @click="inforow(row)">Show Details</b-button>
    </template>
    </b-table>
     </div>
     <div class="col-4">
       <cardproduct @empty-selected="emptyselectedData"
       @show-edit="showEditForm" :datadetail='selecteddata'></cardproduct>
     </div>
  </div>
 <formproduct @cancle="showfrom" @close="showfrom" v-if="show"></formproduct>
 <formedit :dataedit="selecteditdata"
 @close-form="showEditForm" @cancle-edit="showEditForm"
 @empty-selected="emptyselectedData"
 v-if="showedit" ></formedit>
</div>
</template>
<script>
// import tableProduct from '@/components/tableproduct.vue';
import formproduct from '@/components/form.vue';
import cardproduct from '@/components/cardProduct.vue';
import formedit from '@/components/formedit.vue';
import { BTable, BButton } from 'bootstrap-vue';


export default {
  components: {
    // tableProduct,
    formproduct,
    cardproduct,
    formedit,
    'b-table': BTable,
    'b-button': BButton,
  },
  data() {
    return {
      show: false,
      showedit: false,
      selecteditdata: '',
      allProduct: '',
      selecteddata: '',
      srtBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'id', sortable: true },
        { key: 'name', sortable: true, label: 'Product Name' },
        { key: 'stock', sortable: true },
        {
          key: 'price',
          sortable: true,
          formatter: (value) => `Rp. ${new Intl.NumberFormat().format(value)} `,
        },
        { key: 'actions', label: 'Actions' },
      ],
    };
  },
  created() {
    this.$store.dispatch('loadData');
  },
  computed: {
    loadData() {
      return this.$store.state.allData;
    },
  },
  methods: {
    showfrom() {
      this.show = !this.show;
    },
    showEditForm(obj) {
      this.showedit = !this.showedit;
      this.selecteditdata = obj;
    },
    emptyselectedData() {
      this.selecteddata = false;
    },
    inforow(data) {
      this.selecteddata = data.item;
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
