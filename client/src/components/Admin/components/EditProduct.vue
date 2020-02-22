<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-indigo-4 text-white" v-if="product">
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
        <q-btn dense flat icon="close" v-close-popup @click="close">
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
                  v-model="price"
                  type="number"
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
                  v-model="stock"
                  type="number"
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
                  v-model="category"
                  filled
                  :options="options"
                  label="Category"
                  :rules="[(val) => !!val || 'Category is required']"
                />
              </div>
            </div>

            <q-editor
              class="text-black"
              min-height="5rem"
              v-model="description"
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
import firebase from 'firebase'
import Confirm from '../../Confirm'
import axios from '../../../axios'
export default {
  name: 'EditProduct',
  props: ['onEdit', 'product'],
  data() {
    return {
      dialog: false,
      maximizedToggle: false,
      options: ['Desktop', 'Laptop', 'Keyboard', 'Monitor', 'Mouse'],
      loading: false,
      image: null,
      imageData: null,
      newImage: false,
      name: null,
      price: null,
      stock: null,
      category: null,
      description: null
    }
  },
  watch: {
    onEdit(o, n) {
      this.dialog = this.onEdit
      this.picture = this.product.image_url
      this.imageData = this.product.image_url
      this.image = this.product.image_url
      this.name = this.product.name
      this.price = this.product.price
      this.stock = this.product.stock
      this.category = this.product.category
      this.description = this.product.description
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      // this.updateProduct()
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
        this.picture = null
        return new Promise((resolve, reject) => {
          if (this.newImage) {
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
                reject(error)
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
                    resolve(url)
                  })
                  .catch((err) => {
                    reject(err)
                    this.loading = false
                    this.$q.notify({
                      type: 'negative',
                      message: err.response.data
                    })
                  })
              }
            )
          } else {
            this.picture = this.product.image_url
            resolve(true)
          }
        })
          .then((url) => {
            console.log(this.picture)
            return axios({
              method: 'PUT',
              url: '/products/' + this.product.id,
              headers: {
                token: localStorage.token
              },
              data: {
                name: this.name,
                price: this.price,
                image_url: this.picture,
                category: this.category,
                stock: this.stock,
                description: this.description
              }
            })
          })
          .then(({ data }) => {
            this.loading = false
            this.$store.dispatch('GET_ALL_PRODUCT_LIST')
            this.newImage = false
            this.$emit('close')
            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: `Product updated in category ${data.category}`
            })
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
            this.$q.notify({
              type: 'negative',
              message: 'Error, details in console'
            })
          })
      }
    },
    onReset() {
      this.picture = this.product.image_url
      this.imageData = this.product.image_url
      this.image = this.product.image_url
      this.name = this.product.name
      this.price = this.product.price
      this.stock = this.product.stock
      this.category = this.product.category
      this.description = this.product.description
      this.$refs.name.resetValidation()
      this.$refs.price.resetValidation()
      this.$refs.stock.resetValidation()
      this.$refs.category.resetValidation()
    },
    pickFile() {
      this.$refs.image.click()
    },
    previewImage() {
      this.newImage = true
      this.image = event.target.files[0].name
      this.picture = URL.createObjectURL(event.target.files[0])
      this.imageData = event.target.files[0]
    },
    close() {
      this.newImage = false
      this.$emit('close')
    }
  }
}
</script>

<style></style>
