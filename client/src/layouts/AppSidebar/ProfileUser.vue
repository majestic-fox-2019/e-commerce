<template>
  <div class="sidebar-header">
    <div class="user-pic">
      <img class="img-responsive img-rounded" :src="getProfile"
        alt="User picture">
    </div>
    <div class="user-info">
      <span class="user-name">
        <strong>{{ getName }}</strong>
      </span>
      <span class="user-role">{{ getUser.role }}</span>
      <span class="user-status">
        <i class="fa fa-circle"></i>
        <span>{{ getUser ? 'Online' : 'Offline' }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileUser',
  data(){
    return {}
  },
  computed: {
    getName() {
      let user = JSON.parse(localStorage.getItem('user'))
      let name = ''
      for(let i = 0; i < user.name.length; i++){
        if(user.name[i] == ' '){
          break
        }else{
          name += user.name[i]
        }
      }
      return name
    },
    getUser(){
      return JSON.parse(localStorage.getItem('user'))
    },
    getProfile(){
      let user = JSON.parse(localStorage.getItem('user'))
      let firstCapName = user.name[0].toUpperCase()
      return `https://dummyimage.com/600x600/fff/16c7ff&text=${firstCapName}`
    }
  }
}
</script>

<style scoped>

</style>