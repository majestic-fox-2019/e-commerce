<template>
  <div class="row" ref="refresh">
    <q-pull-to-refresh
      class="col-8 q-mx-auto"
      @refresh="refresh"
      :scroll-target="$refs.refresh"
    >
      <q-card class="bg-teal-1 col-12 col-sm-6 q-mx-auto q-mt-md q-mb-xl">
        <p class="text-h3 text-center q-pa-lg">Order List</p>
      </q-card>
      <!-- <pre>{{ orders }}</pre> -->
      <q-card class="col-8 q-my-md q-mx-auto">
        <q-input
          v-model="search"
          filled
          type="search"
          placeholder="Search by username or email"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card>
      <q-card
        class="col-8 col-sm-8 col-md-8 row flex q-mx-auto q-pa-md bg-green-1 q-mb-xl"
      >
        <div class="row full-width flex justify-evenly">
          <q-select
            class="col-12 col-sm-4"
            filled
            v-model="select"
            :options="options"
            label="Filter by status"
          />
          <q-select
            class="col-12 col-sm-4"
            filled
            v-model="selectTime"
            :options="timeOptions"
            label="Filter by time"
          />
        </div>
        <q-intersection
          v-for="order in orders"
          :key="order.id"
          transition="scale"
          class="full-width"
        >
          <OrderCard
            :order="order"
            class="col-12 col-sm-12 col-md-12 col-lg-12 q-my-md"
            @approve="approveOrder"
          />
        </q-intersection>
      </q-card>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import axios from '../../axios'
import OrderCard from './components/OrderCard'
export default {
  name: 'OrderList',
  components: {
    OrderCard
  },
  data() {
    return {
      select: 'Unapproved',
      options: ['Unapproved', 'Approved'],
      selectTime: 'Show All',
      timeOptions: ['Show All', 'This Month', 'Today'],
      confirm: false,
      loading: false,
      productId: null,
      search: null
    }
  },
  created() {
    this.getAllOrders()
  },
  computed: {
    orders() {
      const { orderList } = this.$store.state
      if (this.search) {
        return orderList.filter(
          (el) =>
            el.User.username.toLowerCase().includes(this.search) ||
            el.User.email.toLowerCase().includes(this.search)
        )
      } else if (this.select) {
        if (this.select == 'Approved') {
          return orderList.filter((el) => el.approved == true)
        }
      } else if (this.selectTime) {
        if (this.selectTime == 'This Month') {
          return orderList.filter(
            (el) =>
              new Date(el.updatedAt).getMonth() == new Date().getMonth() &&
              el.approved == true
          )
        } else if (this.selectTime == 'Today') {
          return orderList.filter(
            (el) => new Date(el.updatedAt).getDate() == new Date().getDate()
          )
        }
      }

      return orderList.filter((el) => el.approved == false)
    }
  },
  methods: {
    getAllOrders() {
      this.$store.dispatch('GET_ON_CONFIRM_ORDERS')
    },
    refresh(done) {
      try {
        const get = async () => {
          await this.getAllOrders()
          setTimeout(() => {
            done()
          }, 500)
        }
        get()
      } catch (error) {
        console.log(error)
      }
    },
    approveOrder(order) {
      axios({
        method: 'PATCH',
        url: '/carts/approve',
        headers: {
          token: localStorage.token
        },
        data: {
          userId: order.userId,
          productId: order.productId
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.getAllOrders()
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style></style>
