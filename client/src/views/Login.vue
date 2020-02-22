<template>
    <div class="container">
        <form v-if="$store.state.page==='login'">
            <h3>Login</h3>
            <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
                <small id="emailHelp" class="form-text text-white" color="white">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password">
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <button type="submit" class="btn btn-warning mr-2 mb-3" v-on:click.prevent="actLogin">Login</button>
                    <button type="submit" class="btn btn-secondary mb-3" v-on:click.prevent="toRegisterPage">Register</button>
                </div>
                <div>
                    <button type="submit" class="btn btn-danger mr-2 mb-3" v-on:click.prevent="actCancel">Cancel</button>
                </div>
            </div>
        </form>

        <form v-if="$store.state.page==='register'">
            <h3>Register</h3>
            <div class="form-group">
                <label for="inputName">Name</label>
                <input type="text" class="form-control" id="inputName" v-model="name">
            </div>
            <div class="form-group">
                <label for="inputPhone">Phone</label>
                <input type="text" class="form-control" id="inputPhone" v-model="phone">
            </div>
            <div class="form-group">
                <label for="inputAddress">Address</label>
                <textarea name="inputAddress" id="inputAddress" class="form-control" v-model="address" cols="30" rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password">
            </div>
            <!-- <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputRole">Role</label>
                </div>
                <select class="custom-select" id="inputRole" v-model="role">
                    <option selected>Choose...</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                </div>
            </div> -->

            <div class="d-flex justify-content-between">
                <div>
                    <button type="submit" class="btn btn-secondary mr-2 mb-3" v-on:click.prevent="toLoginPage">Login</button>
                    <button type="submit" class="btn btn-success mb-3" v-on:click.prevent="actRegister">Register</button>
                </div>
                <div>
                    <button type="submit" class="btn btn-danger mr-2 mb-3" v-on:click.prevent="actCancel">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            name: '',
            password: '',
            email: '',
            phone: '',
            address: '',
            role: 'user',
        }
    },
    methods: {
        toLoginPage() {
            this.$store.state.page = 'login';
            this.$router.push('/login');
        },
        toRegisterPage() {
            this.$store.state.page = 'register';
            this.$router.push('/register');
        },
        actLogin() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
        },
        actRegister() {
            this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password,
                phone: this.phone,
                address: this.address,
                role: this.role
            })
        },
        actCancel() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: 50px;
    padding-top: 50px;
    padding-bottom: 50px;
    border: 1px solid rgba(200,200,200,1);
    border-radius: 10px;
    box-shadow: 5px 8px 18px rgba(200,200,200,1);
    background-color: rgb(88, 78, 78);
    color: white;
    width: 500px;
}
</style>