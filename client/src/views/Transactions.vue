<template>
  <div class="mt-5">
      <h1><i class="fas fa-shopping-basket"></i> Transactions <i class="fas fa-shopping-basket"></i></h1>
      <div class="transactionContent mt-5">
          <div class="left">
              <div class="transactionMenu">
                  <div @click="toOngoing" class="transactionMenu-item">
                      Ongoing Transactions
                  </div>
                  <div @click="toHistory" class="transactionMenu-item">
                      Purchase History
                  </div>
              </div>
              <div class="transactionMenu2">
                  <div class="underlineDiv">
                    <hr v-if="onGoing" class="underline">
                  </div>
                  <div class="underlineDiv">
                    <hr v-if="history" class="underline">
                  </div>
              </div>
              <div class="left-content mt-5">
                  <router-view/>
              </div>
          </div>
          <div class="right">
              <img class="transactionImg" src="../assets/transaction.svg" alt="transaction pic">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'OnGoing',
  data () {
    return {
      onGoing: true,
      history: false
    }
  },
  methods: {
    toOngoing () {
      this.onGoing = true
      this.history = false
      this.$router.push('/transactions/ongoing')
    },
    toHistory () {
      this.onGoing = false
      this.history = true
      this.$router.push('/transactions/history')
    }
  },
  created () {
    this.$router.push('/transactions/ongoing')
  }
}
</script>

<style scoped>
.left-content {
  height: 84%;
  width: 100%;
  background: white;
  border-radius: 10px;
}
.underlineDiv {
    width: 50%;
}
.underline {
    border-top: 7px solid #3742fa;
    width: 100%;
}
.transactionMenu-item {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.6em;
}
.transactionMenu {
    display: flex;
    width: 100%;
    height: 7%;
}

.transactionMenu2 {
    display: flex;
    width: 100%;
    height: 1%;
}
.transactionImg {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.left {
    width: 65%;
    height: 100%;
    background-color: #74b9ff;
    padding: 1%;
    overflow: scroll;
    border-radius: 10px;
}
.right {
    width: 27%;
    height: 100%;
    background-color: #74b9ff;
    border-radius: 10px;

}
.transactionContent {
    height: 77vh;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    padding-left: 5%;
    padding-right: 5%;
}
</style>
