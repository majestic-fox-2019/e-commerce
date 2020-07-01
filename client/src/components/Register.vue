<template>
  <div id="register">
      <b-container >
          <b-row>
              <b-col md="8" offset-md="2">
                <b-form >
                    <b-form-group id="input-group-1" label="full Name:" label-for="input-1"
                    >
                        <b-form-input
                        id="input-1"
                        v-model="fullName"
                        type="text"
                        required
                        placeholder="insert full name"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="email:" label-for="input-2"
                    >
                        <b-form-input
                        id="input-2"
                        v-model="email"
                        type="email"
                        required
                        placeholder="enter email"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-3" label="password" label-for="input-3">
                        <b-form-input 
                            id="input-3" 
                            v-model="password" 
                            type="password" 
                            required>
                        </b-form-input>
                    </b-form-group>
                    <b-row cols="1">
                        <b-button type="submit" variant="success">register</b-button>
                    </b-row>
                </b-form>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
    data(){
        return {
            fullName: null,
            email: null,
            password: null
        }
    }
}
</script>

<style>

</style>