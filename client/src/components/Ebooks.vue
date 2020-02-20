<template>
  <v-data-table
    :headers='headers'
    :items='ebooks'
    :search="search"
    sort-by='name'
    :itemsPerPage='8'
    class='elevation-1'
  >
    <template v-slot:top>
      <v-toolbar flat color='white'>
        <v-toolbar-title>Ebooks</v-toolbar-title>
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
          <template v-slot:activator='{ on }'>
            <v-btn color='primary' dark class='mb-2' v-on='on'>Add Ebook</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class='headline'>{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols='12' sm='6' md='12'>
                    <v-text-field v-model='editedItem.name' label='Title'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='6'>
                    <v-text-field v-model='editedItem.price' label='Unit Price'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='6'>
                    <v-text-field v-model='editedItem.stock' label='Stock'></v-text-field>
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
      <v-btn color='primary' @click='initialize'>Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    alert: false,
    message: '',
    search: '',
    dialog: false,
    dialog_delete: false,
    headers: [
      {
        text: 'Name',
        align: 'left',
        value: 'name',
      },
      { text: 'Unit Price', value: 'price' },
      { text: 'Stock', value: 'stock' },
      { text: 'Image Url', value: 'image_url' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    ebooks: [],
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
      return this.editedIndex === -1 ? 'Add Ebook' : 'Edit Ebook';
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
        .get(`${this.$store.state.url_backend}/products`)
        .set('accesstoken', this.$store.state.isLogin)
        .end((err, res) => {
          if (err) {
            this.alert = true;
            this.message = res ? res.body.error : err;
          } else {
            this.ebooks = res.body;
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.ebooks.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem() {
      if (this.deletedItem.id) {
        this.deletedIndex = this.ebooks.indexOf(this.deleteItem);
        this.$store.state.superagent
          .delete(`${this.$store.state.url_backend}/products/${this.deletedItem.id}`)
          .set('accesstoken', this.$store.state.isLogin)
          .end((err, res) => {
            if (err) {
              this.message = res ? res.body.error : err;
            } else {
              this.ebooks.splice(this.deletedIndex, 1);
              this.message = res.body;
            }
            this.alert = true;
            this.dialog_delete = false;
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
      if (this.editedIndex > -1) {
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
                Object.assign(this.ebooks[this.editedIndex], this.editedItem);
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
              this.message = res ? res.body.error : err;
            } else {
              this.message = res.body;
              this.ebooks.push(this.editedItem);
            }
            this.alert = true;
          });
      }
      this.close();
    },
  },
};
</script>
