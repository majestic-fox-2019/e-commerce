<template>
  <v-data-table
    :headers='headers'
    :items='tutorials'
    :search="search"
    sort-by='name'
    :itemsPerPage='8'
    class='elevation-1'
  >
    <template v-slot:top>
      <v-toolbar flat color='white'>
        <v-toolbar-title>Tutorials</v-toolbar-title>
        <v-divider class='mx-4' inset vertical></v-divider>
        <v-card-title>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-dialog v-model='dialog' max-width='500px'>
          <v-snackbar
              v-model="alert_modal"
              :top="true"
          >
              {{ message_modal }}
              <v-btn
                  color="primary"
                  text
                  @click="alert_modal = false"
              >
                  Close
              </v-btn>
          </v-snackbar>
          <template v-slot:activator='{ on }'>
            <v-btn @click="close" color='primary' dark class='mb-2' v-on='on'>Add Tutorial</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class='headline'>{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols='12' sm='6' md='12'>
                    <v-text-field v-model='editedItem.name' label='Name'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='6'>
                    <v-text-field v-model='editedItem.price' label='Price'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='6'>
                    <v-text-field v-model='editedItem.stock' label='Total Videos'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='12'>
                    <v-text-field v-model='editedItem.image_url' label='Image Url'></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color='blue darken-1' text @click='close'>Cancel</v-btn>
              <v-btn color='blue darken-1' text @click='save'>Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog_delete"
          max-width="300"
        >
          <v-card>
            <v-card-title class="headline">Confirm delete product</v-card-title>
            <v-card-text>
              Are you sure you want to delete this product?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog_delete = false"
              >
                NO
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="deleteItem"
              >
                YES
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar
            v-model="alert"
            :top="true"
        >
            {{ message }}
            <v-btn
                color="primary"
                text
                @click="alert = false"
            >
                Close
            </v-btn>
        </v-snackbar>
      </v-toolbar>
    </template>
    <template v-slot:item.action='{ item }'>
      <v-icon small class='mr-2' @click='editItem(item)'>
        edit
      </v-icon>
      <v-icon small @click='dialog_delete = true; deletedItem = item;'>
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data found!
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    alert: false,
    message: '',
    alert_modal: false,
    message_modal: '',
    search: '',
    dialog: false,
    dialog_delete: false,
    headers: [
      {
        text: 'Name',
        align: 'left',
        value: 'name',
      },
      { text: 'Price', value: 'price' },
      { text: 'Total Videos', value: 'stock' },
      { text: 'Image Url', value: 'image_url' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    tutorials: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      price: 0,
      stock: 0,
      image_url: '',
    },
    defaultItem: {
      name: '',
      price: 0,
      stock: 0,
      image_url: '',
    },
    deletedIndex: -1,
    deletedItem: {
      name: '',
      price: 0,
      stock: 0,
      image_url: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add Tutorial' : 'Edit Tutorial';
    },
  },

  watch: {
    // dialog(val) {
    //   val || this.close();
    // }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store.state.superagent
        .get(`${this.$store.state.url_backend}/products/2`)
        .set('accesstoken', this.$store.state.isLogin)
        .end((err, res) => {
          if (err) {
            this.alert = true;
            this.message = res ? res.body.error : err;
          } else {
            this.tutorials = res.body;
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.tutorials.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem() {
      if (this.deletedItem.id) {
        this.deletedIndex = this.tutorials.indexOf(this.deletedItem);
        this.$store.state.superagent
          .delete(`${this.$store.state.url_backend}/products/${this.deletedItem.id}`)
          .set('accesstoken', this.$store.state.isLogin)
          .end((err, res) => {
            if (err) {
              this.message = res ? res.body.error : err;
            } else {
              this.alert = true;
              this.dialog_delete = false;

              this.tutorials.splice(this.deletedIndex, 1);
              this.message = res.body;
            }
          });
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        const { defaultItem } = this;
        this.editedItem = { ...defaultItem };
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.editedItem.CategoryId = 2;

      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        if (this.editedItem.id) {
          this.$store.state.superagent
            .put(`${this.$store.state.url_backend}/products/${this.editedItem.id}`)
            .set('accesstoken', this.$store.state.isLogin)
            .send(this.editedItem)
            .end((err, res) => {
              if (err) {
                this.message = res ? res.body.error : err;
              } else {
                this.message = res.body;
                Object.assign(this.tutorials[this.editedIndex], this.editedItem);
                this.close();
              }
              this.alert = true;
            });
        }
      } else {
        this.$store.state.superagent
          .post(`${this.$store.state.url_backend}/products`)
          .set('accesstoken', this.$store.state.isLogin)
          .send(this.editedItem)
          .end((err, res) => {
            if (err) {
              this.message_modal = res ? res.body.error : err;
            } else {
              this.message_modal = res.body.message;
              this.editedItem.id = res.body.product.id;
              this.tutorials.push(this.editedItem);
              this.close();
            }
            this.alert_modal = true;
          });
      }
    },
  },
};
</script>
