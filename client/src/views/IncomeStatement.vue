<template>
  <div class="IncomeStatement-container mt-5">
      <h1 v-if="$router.currentRoute.path !== '/admin/Incomes'"><i class="fas fa-chart-bar"></i> {{$store.state.userInfo.shopName}} Income Statement <i class="fas fa-chart-bar"></i></h1>
      <div class="IncomeContent mt-5">
        <div class="incomeContent-container">
          <div class="left">
            <IncomeCard v-for="(incomeData, i) in $store.state.incomes" :key="i" :income="incomeData"></IncomeCard>
          </div>
          <div class="right">
            <div class="TotalIncome">
              <div class="total-content">
                <h3>Total Income</h3>
                <h5>{{$store.state.totalIncome}}</h5>
              </div>
            </div>
            <div class="incomeImg">
              <img class="IncomePic" src="../assets/Income.svg" alt="Income Img">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import IncomeCard from '../components/IncomeCard'
export default {
  name: 'IncomeStatement',
  components: {
    IncomeCard
  },
  created () {
    this.$store.dispatch('fetchIncomes')
  }
}
</script>

<style scoped>
.total-content {
  border-radius: 10px;
  background-color: #0abde3;
  width: 90%;
  height: 20%;
}
.IncomePic {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.TotalIncome {
  height: 50%;
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.incomeImg {
  height: 50%;
  width: 100%;
}
.right {
  width: 18%;
  height: 100%;
  background-color: #48dbfb;
  border-radius: 10px;
}
.left {
  width: 77%;
  height: 100%;
  overflow: scroll;
  background-color: #48dbfb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.incomeContent-container {
 height: 98%;
 width: 90%;
 display: flex;
 justify-content: space-evenly;
}
.IncomeStatement-container {
  height: 88vh;
  width: 100vw;
}
.IncomeContent {
  height: 88%;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
