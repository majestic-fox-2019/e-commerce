<template>
    <v-container fluid>
      <v-dialog
        v-model="dialog_buy"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline">Confirm add to cart</v-card-title>
          <v-card-text>
            Are you sure you want to add product to cart?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog_buy = false"
            >
              NO
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="buy"
            >
              YES
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog_love"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline">Confirm add to love list</v-card-title>
          <v-card-text>
            Are you sure you want to add product to love list?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog_love = false"
            >
              NO
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="love"
            >
              YES
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog_bookmark"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline">Confirm add to bookmark</v-card-title>
          <v-card-text>
            Are you sure you want to add product to bookmark?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog_love = false"
            >
              NO
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="bookmark"
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
      <v-text-field
        v-model='search_value'
        label='Search Ebook'
        @input="search"
      ></v-text-field>
      <v-row dense>
        <v-col
          v-for="ebook in ebooks"
          :key="ebook.title"
          :cols="ebook.flex"
        >
          <v-card>
            <v-img
              v-if="!ebook.image_url"
              src="@/assets/no-image-available.png"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="ebook.name"></v-card-title>
            </v-img>
            <v-img
              v-if="ebook.image_url"
              :src="ebook.image_url"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="ebook.name"></v-card-title>
              <v-card-title v-text="formatMoney(ebook.price)"></v-card-title>
            </v-img>

            <v-card-actions>
              Available Stock: {{ebook.stock}}
              <v-spacer></v-spacer>

              <v-btn
                v-if="ebook.stock > 0"
                icon
                @click="objBook = ebook; dialog_buy = true"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>


              <v-btn
                icon
                @click="objBook = ebook; dialog_love = true"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn
                icon
                @click="objBook = ebook; dialog_bookmark = true"
              >
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import moneyFormatter from '../helpers/formatMoney';
import parseJwt from '../helpers/jwtParser';

export default {
  data: () => ({
    alert: false,
    message: '',
    ebooks_ori: [],
    ebooks: [],
    objBook: null,
    dialog_buy: false,
    dialog_love: false,
    dialog_bookmark: false,
    search_value: '',
  }),
  methods: {
    search() {
      this.ebooks = this.ebooks_ori.filter((ebook) => {
        const ebookName = ebook.name.toLowerCase();
        const searchValue = this.search_value.toLowerCase();
        return ebookName.includes(searchValue);
      });
    },
    buy() {
      const objUser = parseJwt(this.$store.state.isLogin);
      this.$store.state.superagent
        .post(`${this.$store.state.url_backend}/transactions`)
        .set('accesstoken', this.$store.state.isLogin)
        .send({
          UserId: objUser.id,
          ProductId: this.objBook.id,
          price: this.objBook.price,
        })
        .end((err, res) => {
          if (err) {
            this.alert = true;
            this.message = res ? res.body.error : err;
          } else {
            this.alert = true;
            this.message = res.body;
            this.dialog_buy = false;
            this.$store.dispatch('getCartTotal');
          }
        });
    },
    love() {
      const objUser = parseJwt(this.$store.state.isLogin);
      this.$store.state.superagent
        .post(`${this.$store.state.url_backend}/loves`)
        .set('accesstoken', this.$store.state.isLogin)
        .send({
          UserId: objUser.id,
          ProductId: this.objBook.id,
        })
        .end((err, res) => {
          if (err) {
            this.alert = true;
            this.message = res ? res.body.error : err;
          } else {
            this.alert = true;
            this.message = res.body;
            this.dialog_love = false;
            this.$store.dispatch('getLoveTotal');
          }
        });
    },
    bookmark() {
      const objUser = parseJwt(this.$store.state.isLogin);
      this.$store.state.superagent
        .post(`${this.$store.state.url_backend}/bookmarks`)
        .set('accesstoken', this.$store.state.isLogin)
        .send({
          UserId: objUser.id,
          ProductId: this.objBook.id,
        })
        .end((err, res) => {
          if (err) {
            this.alert = true;
            this.message = res ? res.body.error : err;
          } else {
            this.alert = true;
            this.message = res.body;
            this.dialog_bookmark = false;
            this.$store.dispatch('getBookmarkTotal');
          }
        });
    },
    formatMoney(money) {
      return moneyFormatter(money);
    },
  },
  created() {
    this.$store.state.superagent
      .get(`${this.$store.state.url_backend}/products/1`)
      .set('accesstoken', this.$store.state.isLogin)
      .end((err, res) => {
        if (err) {
          this.alert = true;
          this.message = res ? res.body.error : err;
        } else {
          const ebooks = res.body.map((ebook) => {
            ebook.flex = 6;
            return ebook;
          });
          this.ebooks = ebooks;
          this.ebooks_ori = ebooks;
        }
      });
  },
};
</script>
<style scoped>
</style>
