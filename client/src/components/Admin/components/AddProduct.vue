<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-indigo-4 text-white">
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip
            v-if="maximizedToggle"
            content-class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip
            v-if="!maximizedToggle"
            content-class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup @click="$emit('close')">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pa-md">
        <q-card class="q-pa-lg">
          <form
            @submit.prevent.stop="onSubmit"
            @reset.prevent.stop="onReset"
            class="q-gutter-md"
          >
            <q-input
              ref="name"
              filled
              v-model="name"
              label="Product name"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            />

            <div class="row q-col-gutter-sm">
              <div class="col col-md-4">
                <q-input
                  ref="price"
                  filled
                  type="number"
                  v-model="price"
                  label="Price per unit"
                  lazy-rules
                  :rules="[
                    (val) => (val !== null && val !== '') || 'Price min. 1'
                  ]"
                />
              </div>
              <div class="col col-md-4">
                <q-input
                  ref="stock"
                  filled
                  type="number"
                  v-model="stock"
                  label="Stock"
                  lazy-rules
                  :rules="[
                    (val) => (val !== null && val !== '') || 'Stock min. 1'
                  ]"
                />
              </div>

              <div class="col col-md-4">
                <q-select
                  ref="category"
                  class="col col-md-3"
                  filled
                  v-model="category"
                  :options="options"
                  label="Category"
                  :rules="[(val) => !!val || 'Category is required']"
                />
              </div>
            </div>

            <q-editor
              class="text-black"
              v-model="description"
              min-height="5rem"
              :toolbar="[
                ['unordered', 'ordered', 'outdent', 'indent'],
                ['bold', 'italic', 'underline'],
                ['undo', 'redo']
              ]"
            />

            <!-- firebase upload -->
            <div>
              <q-input
                ref="image"
                filled
                v-model="image"
                @click="pickFile"
                label="Product Image"
              />
              <input
                ref="image"
                type="file"
                @change="previewImage"
                accept="image/*"
                hidden
              />
            </div>
            <div class="flex justify-center" v-if="imageData != null">
              <img class="preview" :src="picture" width="300" height="300" />
            </div>

            <div class="flex justify-center">
              <q-btn
                class="text-weight-bold"
                label="Submit"
                type="submit"
                color="primary"
                :loading="loading"
              />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </form>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from '../../../axios'
import firebase from 'firebase'
export default {
  name: 'AddProduct',
  props: ['active'],
  data() {
    return {
      dialog: false,
      maximizedToggle: false,
      name: null,
      price: null,
      description: '',
      stock: null,
      category: null,
      image_url: null,
      options: ['Desktop', 'Laptop', 'Keyboard', 'Monitor', 'Mouse'],
      imageData: null,
      picture: null,
      image: null,
      loading: false
    }
  },
  watch: {
    active(o, n) {
      this.dialog = this.active
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$refs.name.validate()
      this.$refs.price.validate()
      this.$refs.stock.validate()
      this.$refs.category.validate()

      if (this.$refs.name.hasError || this.$refs.price.hasError) {
        this.formHasError = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      } else {
        const storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData)
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            // console.log(error.message)
            this.loading = false
            this.$q.notify({
              type: 'negative',
              message: error.message
            })
          },
          () => {
            this.uploadValue = 100
            storageRef.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                this.picture = url
                return axios({
                  method: 'POST',
                  url: '/products',
                  headers: {
                    token: localStorage.token
                  },
                  data: {
                    name: this.name,
                    price: this.price,
                    image_url: url,
                    category: this.category,
                    stock: this.stock,
                    description: this.description
                  }
                })
              })
              .then(({ data }) => {
                this.loading = false
                this.$store.dispatch('GET_ALL_PRODUCT_LIST')
                this.$emit('close')
                this.$q.notify({
                  icon: 'done',
                  color: 'positive',
                  message: `Product Added with category ${data.category}`
                })
              })
              .catch((err) => {
                this.loading = false
                this.$q.notify({
                  type: 'negative',
                  message: err.response.data
                })
              })
          }
        )
      }
    },

    onReset() {
      this.name = null
      this.price = null

      this.imageData = null
      this.image = null
      this.picture = null

      this.$refs.name.resetValidation()
      this.$refs.price.resetValidation()
      this.$refs.stock.resetValidation()
      this.$refs.category.resetValidation()
    },

    pickFile() {
      this.$refs.image.click()
    },

    previewImage(event) {
      this.image = event.target.files[0].name
      this.picture = URL.createObjectURL(event.target.files[0])
      this.imageData = event.target.files[0]
    }
  }
}
</script>

<style></style>
