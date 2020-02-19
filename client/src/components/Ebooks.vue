<template>
  <v-data-table
    :headers='headers'
    :items='ebooks'
    :search="search"
    sort-by='calories'
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
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.name' label='Dessert name'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.calories' label='Calories'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.fat' label='Fat (g)'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.carbs' label='Carbs (g)'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.protein' label='Protein (g)'></v-text-field>
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
      </v-toolbar>
    </template>
    <template v-slot:item.action='{ item }'>
      <v-icon small class='mr-2' @click='editItem(item)'>
        edit
      </v-icon>
      <v-icon small @click='deleteItem(item)'>
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
    search: '',
    dialog: false,
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
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
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
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
      console.log('melawan');
      this.$store.state.superagent
        .get(`${this.$store.state.url_backend}/products`)
        .set('accesstoken', localStorage.getItem('token'))
        .end((err, res) => {
          if (err) {
            console.log(res.body.error);
            this.alert = true;
            this.message = res.body.error;
          } else {
            console.log(res.body);
            this.ebooks = res.body;
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.ebooks.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    // deleteItem(item) {
    // //   const index = this.ebooks.indexOf(item);
    // //   confirm('Are you sure you want to delete this item?') && this.ebooks.splice(index, 1);
    // },

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
        Object.assign(this.ebooks[this.editedIndex], this.editedItem);
      } else {
        this.ebooks.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
