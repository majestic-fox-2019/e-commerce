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
       <tableProduct :data="loadData" ></tableProduct>
     </div>
     <div class="col-4">
       <cardProduct></cardProduct>
    </div>
  </div>
 <formproduct @cancle="showfrom" @close="showfrom" v-if="show"></formproduct>
</div>
</template>
<script>
import tableProduct from '@/components/table.vue';
import cardProduct from '@/components/cardProduct.vue';
import formproduct from '@/components/form.vue';

export default {
  components: {
    tableProduct,
    cardProduct,
    formproduct,
  },
  data() {
    return {
      show: false,
      allProduct: '',
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
  },
};
</script>

<style>
</style>
