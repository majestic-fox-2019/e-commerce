<template>
  <div class="MenuCard" @click="toMenu(menuDetail.name)">
      <div class="MenuItem" v-html="menuDetail.button">
      </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuCard',
  props: {
    menuDetail: {
      type: Object
    }
  },
  methods: {
    toMenu (target) {
      this.$router.push(`/admin/${target}`)
    }
  }
}
</script>

<style scoped>
.MenuItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.6rem;
    text-align: center;
    font-weight: bold;
}

.MenuCard {
    width: 17vw;
    height: 100%;
    background: teal;
    border-radius: 17px;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
.MenuCard:hover {
    background: rgb(1, 98, 98);
}
</style>
