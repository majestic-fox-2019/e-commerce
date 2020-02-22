<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary text-white">
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
              label="Banner name"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            />
            <!-- firebase upload -->
            <div>
              <q-input
                ref="image"
                filled
                v-model="image"
                @click="pickFile"
                label="Banner Image"
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
  name: 'BannerDialog',
  props: ['active'],
  data() {
    return {
      dialog: false,
      maximizedToggle: false,
      loading: false,
      name: null,
      image: null,
      imageData: null,
      picture: null
    }
  },
  watch: {
    active(o, n) {
      this.dialog = this.active
      this.name = null
      this.image = null
      this.imageData = null
      this.picture = null
    }
  },
  methods: {
    close() {
      this.$emit('cancel')
      this.name = null
      this.image = null
      this.imageData = null
      this.picture = null
    },
    onSubmit() {
      this.loading = true
      this.$refs.name.validate()

      if (this.$refs.name.hasError) {
        this.formHasError = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      } else {
        this.loading = true
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
                  url: '/banners',
                  headers: {
                    token: localStorage.token
                  },
                  data: {
                    name: this.name,
                    image: url
                  }
                })
              })
              .then(({ data }) => {
                this.loading = false
                this.$emit('OK')
                this.onReset()
                this.$q.notify({
                  icon: 'done',
                  color: 'positive',
                  message: `Banner ${data.name} successfully added`
                })
              })
              .catch((err) => {
                this.loading = false
                console.log(err)
                this.$q.notify({
                  type: 'negative',
                  message: 'Error, see console for details'
                })
              })
          }
        )
      }
    },

    onReset() {
      this.name = null
      this.image = null
      this.imageData = null
      this.picture = null
      this.$refs.name.resetValidation()
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
