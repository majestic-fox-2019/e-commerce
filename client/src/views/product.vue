<template>
<div>
  <div class="col-8 d-flex justify-content-between my-2">
  <h2>All List Of Product</h2>
  <button @click="showfrom" type="button" class="btn btn-success"><span>
    <i class="fa fa-plus-square" style="font-size:20px;color:white"></i>
    </span> Add New </button>
  </div>
   <div class="d-flex">
     <div class="col-8">
       <tableProduct @selected-data="selectedData" :data="loadData" ></tableProduct>
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
import tableProduct from '@/components/tableproduct.vue';
import formproduct from '@/components/form.vue';
import cardproduct from '@/components/cardProduct.vue';
import formedit from '@/components/formedit.vue';

export default {
  components: {
    tableProduct,
    formproduct,
    cardproduct,
    formedit,
  },
  data() {
    return {
      show: false,
      showedit: false,
      selecteditdata: '',
      allProduct: '',
      selecteddata: '',
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
    selectedData(obj) {
      this.selecteddata = obj;
    },
    emptyselectedData() {
      this.selecteddata = false;
    },
  },
};
</script>

<style>
</style>
