<template>
  <div class="UserMenu-Main px-5">
    <div class="adminsMain">
      <div class="left">
        <img class="adminPic" src="../assets/admin.svg" alt="admin Pic">
      </div>
      <div class="right">
        <div class="header">
          <div @click="toList" class="headerMenu">
            <div class="menuTitle">
              Admin List
            </div>
            <hr v-if="adminList" class="underline">
          </div>
          <div @click="toRegister" class="headerMenu">
            <div class="menuTitle">
               Register Admin
            </div>
            <hr v-if="registerAdmin" class="underline">
          </div>
        </div>
        <div class="adminUserContent">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',
  data () {
    return {
      adminList: true,
      registerAdmin: false
    }
  },
  methods: {
    toList () {
      this.adminList = true
      this.registerAdmin = false
      this.$router.push('/admin/users/list')
    },
    toRegister () {
      this.adminList = false
      this.registerAdmin = true
      this.$router.push('/admin/users/register')
    }
  },
  created () {
    this.$router.push('/admin/Users/list')
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchUserData', true)
    })
  }
}
</script>

<style scoped>
.adminUserContent {
  height: 85%;
  width: 100%;
}
.menuTitle {
  height: 98%;
  width: 100%;
  font-size: 1.5em;
  font-weight: bold;
}
.underline {
  border-bottom: 3px solid #30336b;
  height: 2%;
  width: 100%;
}
.headerMenu {
  padding-top: 1%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.header {
  width: 100%;
  display: flex;
  height: 15%;
}
.adminPic {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.right {
  width: 65%;
  height: 100%;
  background: #686de0;
  border-radius: 10px;
}
.left {
  width: 30%;
  height: 100%;
  background: #686de0;
  border-radius: 10px;
}
.adminsMain {
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
}
.UserMenu-Main {
  width: 100vw;
  height: 65vh;
  display: flex;
  justify-content: center;
}
</style>
