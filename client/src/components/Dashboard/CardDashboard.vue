<template>
  <b-card no-body class="overflow-hidden mb-3" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        <div class="h-100 card-statistic" :class="name === 'Users' ? 'bg-utama' : name === 'Categories' ? 'bg-utama2' : 'bg-utama3'">
          <h1><i class="fa" :class="name === 'Users' ? 'fa-users' : name === 'Categories' ? 'fa-sitemap' : 'fa-shopping-cart' "></i></h1>
        </div>
      </b-col>
      <b-col md="6">
        <b-card-body class="card-body-dashboard">
          <p>{{ name }}</p>
          <h1>{{ totalData }}</h1>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: ['name', 'data'],
  name: 'CardDashboard',
  data(){
    return {

    }
  },
  computed: {
    totalData(){
      return this.data.length
    }
  }
}
</script>

<style scoped>

</style>