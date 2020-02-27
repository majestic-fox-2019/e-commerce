<template>
      <div class="sidebar bg-dark">
        <div class="nav flex-column pt-4 nav-pills" role="tablist" aria-orientation="vertical">
          <router-link :to="{ name : 'ContentUser' }" class="nav-link text-light pt-2"><i class="fa fa-user-o" aria-hidden="true"></i> Content User</router-link>
          <router-link :to="{ name : 'ContentProduct' }" class="nav-link text-light pt-2"><i class="fa fa-database" aria-hidden="true"></i> Content Product</router-link>
          <router-link :to="{ name : 'ContentCategory' }" class="nav-link text-light pt-2"><i class="fa fa-tags" aria-hidden="true"></i> Content Category</router-link>
        </div>
      </div>
</template>

<script>
export default {
  
}
</script>

<style>
  .sidebar {
    width: 16%;
    height: 95vh;
    position: fixed;
    border-radius: 0px;
  }
  .nav-link{
    cursor: pointer;
    font-size: 13px;
  }

  @media only screen and (max-width: 600px) {
    .sidebar{
      width: 100%;
      height: 10vh;
    }
    .nav-link{
      position: relative;
      text-align: center;
      top: 5px;
      left: 5px;
      width: 8rem;
      height: 100%;
    }
}
</style>