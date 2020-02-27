<template>
  <div class="footer">
    <b-row>
      <b-col md="9">
        <b-row>
          <b-col md="4">
            <div class="kategori-footer">
              <h6>Kategori</h6>
              <ul>
                <li v-for="(cat, idx) in getCategories" :key="idx" @click="getToCategory(cat)">
                  {{ cat.name }}
                </li>
              </ul>
            </div>
          </b-col>
          <b-col md="4">
            <div class="pembayaran-footer">
              <h6>Pembayaran</h6>
              <div class="footer-pembayaran">
                <img src="@/assets/images/bank-bca.jpg" class="image-bank-footer">
                <img src="@/assets/images/bank-bri.jpg" class="image-bank-footer">
                <img src="@/assets/images/bank-bni.jpg" class="image-bank-footer">
              </div>
            </div>
          </b-col>
          <b-col md="4">
            <div class="toko-kami">
              <h6>Toko Kami</h6>
              <p>Jl. Sultan Iskandar Muda No.7,
                Kebayoran Lama, Kota Jakarta Selatan, 
                Daerah Khusus Ibukota Jakarta 12240</p>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="3">
        <img src="@/assets/icons/logo-nike.png" class="logo-footer">
      </b-col>
      <b-col md="12">
        <div class="text-center mt-5 copyright">
          <small class="text-muted">Copyright © 2020
            <span>Muhammad Anova Nurfaqih</span>
          </small>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  computed: {
    getCategories(){
      return this.$store.state.categories
    }
  },
  methods: {
    getToCategory(cat){
      this.$router.push({ name: `CategoryName`, params: { catname: cat.name, id: cat.id }}).catch(err => {})
    },
  },
}
</script>

<style scoped>

</style>