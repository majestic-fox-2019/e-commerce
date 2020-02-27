<template>
  <div class="q-pa-md flex-column">
    <q-card class="q-mt-md q-mx-auto bg-teal-1" style="width: 50%;">
      <p class="text-h3 text-center q-pa-lg">Banner List</p>
    </q-card>
    <div class="q-py-md flex justify-end">
      <q-btn
        class="text-weight-bold"
        fab
        icon="add"
        color="primary"
        push
        @click="toAddPage"
      >
        Add Banner
      </q-btn>
    </div>
    <q-table
      :data="banners"
      :columns="columns"
      row-key="image"
      :sort-method="customSort"
      binary-state-sort
    >
      <template v-slot:body-cell-preview="props">
        <q-td class="text-center" :props="props">
          <q-btn rounded color="secondary">
            Preview
            <q-tooltip>
              <img :src="props.value" alt="asd" width="300" height="300" />
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td class="text-center" :props="props">
          <!-- {{ props.row.id }} -->
          <q-btn
            class="q-ml-sm"
            rounded
            color="negative"
            :loading="loadingDel"
            @click="getDeleteBanner(props.row.id)"
          >
            Delete
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              :offset="[10, 10]"
              content-class="bg-primary text-subtitle2"
            >
              Delete this banner
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
    </q-table>

    <BannerDialog :active="dialog" @OK="onOK" @cancel="onCancel" />

    <div v-if="confirm">
      <Confirm
        :active="confirm"
        :msg="'Delete this data?'"
        @OK="deleteBanner"
        @cancel="confirm = false"
      />
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import Confirm from '../Confirm'
import BannerDialog from './components/BannerDialog'
export default {
  name: 'BannerList',
  components: {
    BannerDialog,
    Confirm
  },
  data() {
    return {
      confirm: false,
      dialog: false,
      loadingDel: false,
      imageUrl: null,
      bannerId: null,
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
          name: 'preview',
          align: 'center',
          label: 'Preview',
          field: 'image'
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
    this.$store.dispatch('GET_ALL_BANNER_LIST')
  },

  computed: {
    banners() {
      return this.$store.state.bannerList
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
            sortBy === 'image' ||
            sortBy == 'createdAt' ||
            sortBy == 'updatedAt'
          ) {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return data
    },
    toAddPage() {
      this.dialog = true
    },
    onOK() {
      this.dialog = false
      this.$store.dispatch('GET_ALL_BANNER_LIST')
    },
    onCancel() {
      this.dialog = false
      this.bannerId = null
    },
    getDeleteBanner(bannerIdTemp) {
      this.confirm = true
      this.bannerId = bannerIdTemp
    },
    deleteBanner() {
      this.loadingDel = true
      axios({
        method: 'DELETE',
        url: 'banners/' + this.bannerId,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          setTimeout(() => {
            this.confirm = false
            this.bannerId = null
            this.$store.dispatch('GET_ALL_BANNER_LIST')
            this.loadingDel = false
            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: `${data.name} has successfully removed from banner list`
            })
          }, 1000)
        })
        .catch((err) => {
          this.loadingDel = false
          this.confirm = false
          this.bannerId = null
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
