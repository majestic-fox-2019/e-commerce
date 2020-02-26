<template>
  <div>
    <div class="col-md-6 offset-md-6 pr-0 header-table mb-3">
      <input v-model="filter" type="text" placeholder="Search" class="search-table" :disabled="items.length === 0">
      <span><i class="fa fa-times" :disabled="!filter" @click="filter = ''"></i></span>
    </div>
    <b-table 
      class="table-mf"
      responsive="sm"
      outlined bordered
      :items="items" 
      :fields="fields" 
      :current-page="currentPage" 
      :per-page="per_page"
      :filter="filter" 
      :filterIncludedFields="filterIncludedFields"
      @filtered="onFiltered"
      show-empty
      busy.sync="busy"
    >
      <template v-slot:cell(no)="data">
        {{ data.index + 1 + ((currentPage - 1) * per_page) }}
      </template>
      <template v-slot:cell(total_price)="data">
        {{ toIDRprice(data.item.total_price) }}
      </template>
      <template v-slot:cell(createdAt)="data">
        {{ data.item.createdAt | formatDate }}
      </template>
      <template v-slot:cell(action)="data">
        <b-button size="sm" variant="danger" class="btn-xs" @click="goDelete(data.item)"><i class="fa fa-trash"></i></b-button>
      </template>
      <template slot="empty">
        <div v-if="busy" class="text-center empty-table">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="ml-2">Loading...</strong>
        </div> 
        <div v-else class="text-center empty-table">Tidak ada data</div>
      </template>
    </b-table>
    <nav>
      <b-pagination
        :total-rows="getTotalRows"
        :per-page="per_page" 
        v-model="currentPage"
        prev-text="<"
        next-text=">"
        hide-goto-end-buttons
      />
    </nav>
  </div>
</template>

<script>
export default {
  props: ['name', 'items', 'fields', 'per_page', 'filterIncludedFields', 'busy'],
  data(){
    return {
      filter: null,
      totalRows: 1,
      currentPage: 1
    }
  },
  computed: {
    getTotalRows(){
      return this.totalRows = this.items.length
    }
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    goDelete(data){
      this.$emit('setDeleteData', data)
    },
    toIDRprice(price){
      let resultPrice = ''
      let strPrice = String(price)
      for(let j = 0; j < strPrice.length; j++){
        if((strPrice.length - j) % 3 === 0 && j !== 0){
          resultPrice += '.' + strPrice[j]
        }else{
          resultPrice += strPrice[j]
        }
      }
      return `Rp. ${resultPrice}`
    }
  }
}
</script>

<style scoped>

</style>