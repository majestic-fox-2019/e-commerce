<template>
  <div class="q-pa-md flex-column">
    <q-card class="q-mt-md q-mx-auto bg-teal-1" style="width: 50%;">
      <p class="text-h3 text-center q-pa-lg">Transaction List</p>
    </q-card>

    <div class="row flex justify-end">
      <q-select
        class="col-12 col-sm-6 col-md-4"
        filled
        v-model="select"
        :options="options"
        label="Filter by status"
      />
    </div>

    <q-table
      class="bg-teal-1 q-my-md"
      dense
      table-header-class="text-weight-bold"
      table-header-style="font-size: 2rem;"
      table-class="text-weight-bold"
      table-style="font-size: 2rem;"
      :data="transactions"
      :columns="columns"
      binary-state-sort
    >
      <template v-slot:body-cell-user="props">
        <q-td class="text-left" :props="props">
          <!-- <pre>{{ props }}</pre> -->
          <q-list separator class="text-body2 text-weight-bold">
            <q-item>
              <q-item-section>{{ props.row.User.username }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>{{ props.row.User.email }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>{{ props.row.User.phone }}</q-item-section>
            </q-item>
          </q-list>
        </q-td>
      </template>
      <template v-slot:body-cell-product="props">
        <q-td class="text-left" :props="props">
          <!-- <pre>{{ props.row.Product }}</pre> -->
          <q-list separator class="text-body2 text-weight-bold">
            <q-item>
              <q-item-section>{{ props.row.Product.name }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>{{ props.row.Product.price }}</q-item-section>
            </q-item>
          </q-list>
        </q-td>
      </template>
      <template v-slot:body-cell-image_url="props">
        <q-td class="text-left" :props="props">
          <q-btn rounded color="secondary">
            Preview
            <q-tooltip>
              <img
                :src="props.row.Product.image_url"
                alt="asd"
                width="300"
                height="300"
              />
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-category="props">
        <q-td class="text-left" :props="props">
          {{ props.row.Product.category }}
        </q-td>
      </template>

      <template v-slot:body-cell-createdAt="props">
        <q-td class="text-left" :props="props">
          {{ new Date(props.value).toDateString() }}
          {{ new Date(props.value).toLocaleTimeString() }}
        </q-td>
      </template>
    </q-table>

    <div class="row q-my-lg flex justify-end">
      <q-card class="col-12 col-sm-12 col-md-4 text-h5 q-pa-md">
        Total Income: <span class="text-deep-orange-10">Rp. {{ total }}</span>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionList',
  created() {
    this.getAllTransactions()
  },
  data() {
    return {
      select: 'All',
      options: ['All', 'This Month', 'Today'],
      columns: [
        {
          name: 'user',
          label: 'User',
          align: 'left',
          field: (row) => row.User,
          sortable: true
        },
        {
          name: 'product',
          align: 'center',
          label: 'Product',
          field: (row) => row.Product,
          sortable: true
        },
        {
          name: 'quantity',
          align: 'center',
          label: 'Quantity',
          field: (row) => row.quantity,
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
          name: 'category',
          align: 'left',
          label: 'Category',
          field: 'category',
          sortable: true
        },
        {
          name: 'createdAt',
          align: 'left',
          label: 'Created At',
          field: 'createdAt',
          sortable: true
        }
      ]
    }
  },
  computed: {
    transactions() {
      if (this.select == 'This Month') {
        return this.$store.state.transactionList.filter(
          (el) => new Date(el.createdAt).getMonth() == new Date().getMonth()
        )
      } else if (this.select == 'Today') {
        return this.$store.state.transactionList.filter(
          (el) => new Date(el.createdAt).getDate() == new Date().getDate()
        )
      } else {
        return this.$store.state.transactionList
      }
    },
    total() {
      const { transactions } = this
      let total = 0
      transactions.forEach((item) => {
        total += item.quantity * item.Product.price
      })
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  methods: {
    getAllTransactions() {
      this.$store.dispatch('GET_TRANSACTION_LIST')
    }
  }
}
</script>

<style></style>
