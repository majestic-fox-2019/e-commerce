<template>
  <div class="adminListPage">
    <div class="listSpot">
        <div class="adminRow" v-for="(admin, i) in $store.state.adminList" :key="i">
            <div class="admincol" style="border-right: 1px solid grey;">
                {{admin.name}}
            </div>
            <div class="admincol">
                {{admin.email}}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminList',
  created () {
    this.$store.dispatch('fetchAdmins')
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchUserData', true)
    })
  }
}
</script>

<style scoped>
.admincol{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.adminRow {
    width: 100%;
    height: 10%;
    display: flex;
    margin-bottom: 1%;
}
.listSpot {
    height: 98%;
    width: 90%;
    overflow: scroll;
    background-color: aliceblue;
    border-radius: 10px;
    padding: 1%;
}
.adminListPage {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
}
</style>
