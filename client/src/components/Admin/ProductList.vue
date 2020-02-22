<template>
  <div class="q-pa-md flex-column">
    <q-card class="q-mx-auto bg-teal-1" style="width: 50%;">
      <h3 class="text-center q-pa-lg">Product List</h3>
    </q-card>
    <div class="q-py-md flex justify-end">
      <q-btn
        class="text-weight-bold"
        fab
        icon="add"
        color="primary"
        push
        @click="showModal = true"
      >
        Add Product
      </q-btn>
    </div>
    <q-table
      class="bg-teal-1"
      dense
      table-header-class="text-weight-bold"
      table-header-style="font-size: 2rem;"
      table-class="text-weight-bold"
      table-style="font-size: 2rem;"
      :data="products"
      :columns="columns"
      row-key="name"
      :sort-method="customSort"
      binary-state-sort
    >
      <template v-slot:body-cell-description="props">
        <q-td class="text-left" :props="props" v-html="props.value"> </q-td>
      </template>
      <template v-slot:body-cell-image_url="props">
        <q-td class="text-left" :props="props">
          <q-btn rounded color="secondary">
            Preview
            <q-tooltip>
              <img :src="props.value" alt="asd" width="300" height="300" />
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-createdAt="props">
        <q-td class="text-left" :props="props">
          {{ new Date(props.value).toDateString() }}
          {{ new Date(props.value).toLocaleTimeString() }}
        </q-td>
      </template>
      <template v-slot:body-cell-updatedAt="props">
        <q-td class="text-left" :props="props">
          {{ new Date(props.value).toDateString() }}
          {{ new Date(props.value).toLocaleTimeString() }}
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td class="text-left" :props="props">
          <!-- {{ props.row.id }} -->
          <q-btn rounded color="secondary" @click="toEditPage(props.row.id)">
            Edit
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              :offset="[10, 10]"
              content-class="bg-primary text-subtitle2"
            >
              Edit this product
            </q-tooltip>
          </q-btn>
          <q-btn
            class="q-ml-sm"
            rounded
            color="negative"
            :loading="loadingDel"
            @click="getDeleteProduct(props.row.id)"
          >
            Delete
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              :offset="[10, 10]"
              content-class="bg-primary text-subtitle2"
            >
              Delete this product
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <AddProduct :active="showModal" @close="onOK" />
    <EditProduct :onEdit="showEdit" :product="productEditTemp" @close="onOK" />
    <div v-if="confirm">
      <Confirm
        :active="confirm"
        :msg="'Delete this data?'"
        @OK="deleteProduct"
        @cancel="confirm = false"
      />
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import Confirm from '../Confirm'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
export default {
  name: 'ProductList',
  components: {
    AddProduct,
    EditProduct,
    Confirm
  },
  data() {
    return {
      showModal: false,
      showEdit: false,
      confirm: false,
      productId: null,
      productEditTemp: null,
      loadingDel: false,
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          sortable: true,
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`
        },
        {
          name: 'price',
          align: 'left',
          label: 'Price',
          field: 'price',
          sortable: true
        },
        {
          name: 'description',
          align: 'center',
          label: 'Description',
          field: 'description',
          sortable: true
        },
        {
          name: 'stock',
          align: 'left',
          label: 'Stock',
          field: 'stock',
          sortable: true
        },
        {
          name: 'category',
          align: 'left',
          label: 'Category',
          field: 'category',
          sortable: true
        },
        {
          name: 'image_url',
          align: 'left',
          label: 'Image URL',
          field: 'image_url',
          sortable: true
        },
        {
          name: 'UserId',
          align: 'left',
          label: 'UserId',
          field: 'UserId'
        },
        {
          name: 'createdAt',
          align: 'left',
          label: 'Created At',
          field: 'createdAt',
          sortable: true
        },
        {
          name: 'updatedAt',
          align: 'left',
          label: 'Updated At',
          field: 'updatedAt',
          sortable: true
        },
        {
          name: 'action',
          align: 'center',
          label: 'Action',
          field: 'id'
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('GET_ALL_PRODUCT_LIST')
  },
  computed: {
    products() {
      return this.$store.state.productList
    }
  },
  methods: {
    customSort(rows, sortBy, descending) {
      const data = [...rows]

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a
          const y = descending ? a : b

          if (
            sortBy === 'name' ||
            sortBy == 'category' ||
            sortBy == 'createdAt' ||
            sortBy == 'updatedAt'
          ) {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else if (
            sortBy == 'price' ||
            sortBy == 'stock' ||
            sortBy == 'UserId'
          ) {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }
      return data
    },
    toEditPage(productId) {
      const product = this.products.find((product) => product.id == productId)
      this.showEdit = true
      this.productEditTemp = product
    },
    onOK() {
      this.showEdit = false
      this.showModal = false
    },
    getDeleteProduct(productIdTemp) {
      this.confirm = true
      this.productId = productIdTemp
    },
    deleteProduct() {
      this.loadingDel = true
      axios({
        method: 'DELETE',
        url: '/products/' + this.productId,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.loadingDel = false
          this.confirm = false
          this.productId = null
          this.$store.dispatch('GET_ALL_PRODUCT_LIST')
          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: `Product deleted with category ${data.category}`
          })
        })
        .catch((err) => {
          this.loadingDel = false
          this.confirm = false
          this.productId = null
          this.$q.notify({
            type: 'negative',
            message: err.response.data
          })
        })
    }
  }
}
</script>

<style></style>
