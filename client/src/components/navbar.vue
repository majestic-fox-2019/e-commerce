<template>
    <nav class="mb-4 navbar navbar-expand-lg navbar navbar-dark " style="background-color : #581E58;">
        <a @click="$router.push('/')" class="navbar-brand"><img src="../assets/logo.jpg" height="45" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul class="navbar-nav ml-auto">
                <li v-if="admin" class="nav-item btn ">
                    <a @click="$router.push('/admin')" class="nav-link"><i class="fa fa-user-lock"></i> Admin <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item btn dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> {{email}} </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                        <a @click="$router.push('/cart')" class="dropdown-item"><i class="fa fa-shopping-basket"></i> Cart</a>
                        <a @click="logout" class="dropdown-item"><i class="fa fa-sign-out"></i> Logout</a>
                    </div>
                </li>
                <li class="nav-item btn">
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            email : localStorage.email,
            admin : false
        }
    },
    methods : {
        logout(){
            localStorage.clear()
            this.$store.state.loggedin = false
            this.$router.push('/login')
        }
    },
    created(){
        if(localStorage.role === 'admin'){
            this.admin = true
        } else {
            this.admin = false
        }
    }
}
</script>

<style>
.hm-gradient {
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}
.navbar .dropdown-menu a:hover {
    color: #616161 !important;
}
.darken-grey-text {
    color: #2E2E2E;
}
</style>