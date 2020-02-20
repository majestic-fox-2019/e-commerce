<template>
  <v-dialog v-model="dialog" persistent max-width="480px">
    <v-card>
      <v-card-title>
        <span class="headline">Create Shop</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Shop Name"
                required
                v-model="form.shop_name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <span style="color: red; margin: 10px 20px;"
        >You dont have a shop now, create one!</span
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.prevent="closeDialog"
          >Close</v-btn
        >
        <v-btn color="blue darken-1" text @click.prevent="createShop"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CreateShop',
  data() {
    return {
      form: {
        shop_name: null
      }
    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialogItem
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('DIALOG_CHANGE', false)
    },
    createShop() {
      this.$store.dispatch('CREATE_SHOP', this.form)
    }
  }
}
</script>
