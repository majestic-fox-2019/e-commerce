<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="10">
        <router-link to="/malls">Mall</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">Category</template>
        <router-link to="/category/drum">
          <el-menu-item index="2-1">Drum</el-menu-item>
        </router-link>
        <router-link to="/category/synthesizer">
          <el-menu-item index="2-2">Synthesizer</el-menu-item>
        </router-link>
        <router-link to="/category/keyboard">
          <el-menu-item index="2-3">Keyboard</el-menu-item>
        </router-link>
        <router-link to="/category/guitar">
          <el-menu-item index="2-4">Guitar</el-menu-item>
        </router-link>
        <router-link to="/category/bass">
          <el-menu-item index="2-5">Bass</el-menu-item>
        </router-link>
        <!-- <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>-->
      </el-submenu>

      <router-link v-if="!$store.state.email" to="/login">
        <el-menu-item index="4" style="float:right"
          >Register/Login</el-menu-item
        >
      </router-link>
      <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
      <el-submenu v-if="$store.state.email" index="3" style="float:right">
        <template slot="title">UserName / Email</template>
        <router-link to="/profile">
          <el-menu-item index="3-1">Profile</el-menu-item>
        </router-link>
        <el-menu-item @click="logOut" index="3-2">Sign Out</el-menu-item>
      </el-submenu>

      <router-link to="/additem">
        <el-menu-item index="5" style="float:right;">
          <i
            class="el-icon-circle-plus-outline"
            style="font-size: x-large;color: beige;"
          ></i>
        </el-menu-item>
      </router-link>
      <router-link to="/history">
        <el-menu-item index="9" style="float:right;">
          <i class="el-icon-goods" style="font-size: x-large;color: beige;"></i>
        </el-menu-item>
      </router-link>
      <router-link to="/chart">
        <el-menu-item index="6" style="float:right;">
          <i
            class="el-icon-shopping-cart-2"
            style="font-size: x-large;color: beige;"
          >
            <el-badge
              v-if="$store.state.quantity + $store.state.mallQuantity > 0"
              style="margin-bottom:2vh"
              :value="$store.state.quantity + $store.state.mallQuantity"
              class="item"
              type="primary"
            ></el-badge>
          </i>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      email: '',
      admin: false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logOut() {
      localStorage.removeItem('e_musicToken')
      localStorage.removeItem('e_musicEmail')
      localStorage.removeItem('e_musicRole')
      this.$store.commit('SET_EMAIL', null)
    }
  },
  computed: {},
  watch: {},
  created() {
    if (localStorage['e_musicEmail']) {
      this.$store.commit('SET_EMAIL', localStorage['e_musicEmail'])
    }
  }
}
</script>

<style scoped></style>
