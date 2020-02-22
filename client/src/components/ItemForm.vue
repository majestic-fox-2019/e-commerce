<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline" v-if="editData == null">Add new product</span>
        <span class="headline" v-else>Edit product</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Product Name"
                  required
                  v-model="item.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Product Description"
                  required
                  v-model="item.description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price"
                  hint="ex: 1000000"
                  persistent-hint
                  required
                  v-model="item.price"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  label="Stocks"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="item.stocks"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="['Brass', 'Battery']"
                  label="Category"
                  required
                  v-model="item.category"
                ></v-select>
              </v-col>
              <v-radio-group v-model="item.status" row>
                <v-radio label="Baru" value="new"></v-radio>
                <v-radio label="Bekas" value="second"></v-radio>
              </v-radio-group>
              <v-col cols="12">
                <v-file-input
                  show-size
                  label="Image input"
                  v-model="item.image_url"
                ></v-file-input>
              </v-col>
              {{ item }}
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="editProduct"
          v-if="editData !== null"
          >Edit</v-btn
        >
        <v-btn color="blue darken-1" text @click="saveProduct" v-else
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ItemForm',
  data() {
    return {
      item: {
        name: null,
        description: null,
        price: null,
        stocks: null,
        category: null,
        status: null,
        image_url: null
      }
    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialogItem
    },
    editData() {
      return this.$store.state.editProduct
    }
  },
  methods: {
    closeDialog() {
      this.item.name = null
      this.item.description = null
      this.item.price = null
      this.item.stocks = null
      this.item.category = null
      this.item.image_url = null
      this.item.status = null
      this.$store.commit('GET_EDIT_DATA', null)
      this.$store.commit('DIALOG_CHANGE', false)
    },
    saveProduct() {
      this.$store.dispatch('POST_PRODUCT', this.item)
    },
    editProduct() {
      this.$store.dispatch('EDIT_PRODUCT', this.item)
    }
  },
  watch: {
    editData(newVal, oldVal) {
      if (newVal !== null) {
        this.item.name = newVal.name
        this.item.description = newVal.description
        this.item.price = newVal.price
        this.item.stocks = newVal.stocks
        this.item.category = newVal.category
        this.item.status = newVal.status
        this.item.image_url = newVal.image_url
      } else {
        this.item.name = null
        this.item.description = null
        this.item.price = null
        this.item.stocks = null
        this.item.category = null
        this.item.image_url = null
        this.item.status = null
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
