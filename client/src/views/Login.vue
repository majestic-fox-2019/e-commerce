<template>
    <div class="container mt-5 pt-5">
      <img src="@/assets/logo.jpg" alt="" style="max-width : 100px;">
    <div class="card mx-auto border-0">
        <div class="card-header border-bottom-0 bg-transparent">
        <ul class="nav nav-tabs justify-content-center pt-4" id="pills-tab" role="tablist">
            <li class="nav-item">
            <a class="nav-link active text-primary" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login"
                aria-selected="true">Login</a>
            </li>

            <li class="nav-item">
            <a class="nav-link text-primary" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register"
                aria-selected="false">Register</a>
            </li>
        </ul>
        </div>

        <div class="card-body pb-4">
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
            <form>
                <div class="form-group">
                <input v-model="email" type="email" name="email" class="form-control" id="email" placeholder="Email" required autofocus>
                </div>

                <div class="form-group">
                <input v-model="password" type="password" name="password" class="form-control" id="password" placeholder="Password" required>
                </div>

                <div class="text-center pt-4">
                <button @click="login" type="button" class="btn">Login</button>
                </div>

            </form>
            </div>

            <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
            <form>
                <div class="form-group">
                <input v-model="email" type="email" name="email" id="email" class="form-control" placeholder="Email" required>
                </div>

                <div class="form-group">
                <input v-model="password" type="password" name="password" id="password" class="form-control" placeholder="Set a password" required>
                </div>

                <div class="form-group">
                <input v-model="confirmPassword" type="password" name="password_confirmation" id="password-confirm" class="form-control" placeholder="Confirm password" required>
                </div>

                <div class="text-center pt-2 pb-1">
                <button @click="register" type="button" class="btn">Register</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import swal from 'sweetalert2'

export default {
    name : 'login',
    data(){
        return {
            email : null,
            password : null,
            confirmPassword : null
        }
    },
    methods : {
        login(){
            let payload = {
                email : this.email,
                password : this.password,
            }
            this.$store.dispatch('login', payload)
        },
        register(){
            if(this.password !== this.confirmPassword){
                swal.fire('Password does not match!')
                return
            } else {
                let payload = {
                    email : this.email,
                    password : this.password,
                }
                this.$store.dispatch('register', payload)
            }
        }
    }
}
</script>

<style scoped>

body {
    background: url('https://images.unsplash.com/photo-1534408679207-69b9615e55a7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=cfbabd80cd2d5cae495a2a732d473562') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.card {
  width: 300px;
}

.btn{
    background-color: #581E58;
    color: white;
}
</style>