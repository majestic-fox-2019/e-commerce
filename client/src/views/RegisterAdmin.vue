<template>
    <div class="container">
        <form>
            <h3>Register ADMIN</h3>
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

            <div class="d-flex justify-content-between">
                <div>
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
    name: 'register',
    data() {
        return {
            name: '',
            password: '',
            email: '',
            phone: '',
            address: '',
            role: 'admin',
        }
    },
    methods: {
        actRegister() {
            this.$store.dispatch('registeradmin', {
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