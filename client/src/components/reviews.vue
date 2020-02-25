<template>
  <div>
    <b-card>
      <!-- {{reviewDet}} -->
      <div class="row justify-content-start">
        <div class="col-4">
          <p class="username">{{reviewDet.User.name}}</p>
        </div>
        <el-rate v-model="reviewDet.rating" disabled show-score text-color="#ff9900"></el-rate>
        <div class="col-8">{{reviewDet.review}}</div>
      </div>
      <p class="tanggal text-left">{{tanggal}}</p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "reviews",
  props: ["reviewDet"],
  computed: {
    tanggal() {
      let date = new Date(this.reviewDet.createdAt).toString().substr(0, 10);
      return date;
    }
  }
};
</script>

<style scoped>
.username {
  text-align: left;
  font-weight: bold;
}

.tanggal {
  text-align: left;
  color: grey;
}
</style>