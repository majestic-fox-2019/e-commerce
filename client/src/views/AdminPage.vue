<template>
  <q-layout view="lHh LpR lFf">
    <Navbar @drawer="left = !left" />

    <Drawer :open="left" @drawer="left = !left" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="flex justify-center vertical-middle">
          E-Commerce by
          <a class="q-ml-sm text-grey-1" href="https://github.com/muhafaa">
            Muhammad Fajri
          </a>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-scroller position="bottom" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="green" push>
        <q-tooltip anchor="top middle" self="center middle">
          Scroll Back Up
        </q-tooltip>
      </q-btn>
    </q-page-scroller>
  </q-layout>
</template>

<script>
import Navbar from '../components/Admin/partials/Navbar'
import Drawer from '../components/Admin/partials/Drawer'
export default {
  name: 'AdminHome',
  components: {
    Navbar,
    Drawer
  },
  data() {
    return {
      left: false
    }
  }
}
</script>
