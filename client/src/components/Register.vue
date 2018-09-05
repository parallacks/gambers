<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="grey elevation-2">
        <v-toolbar flat dense class="black" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pt-2">
          <v-test-field
            type="email"
            name="email"
            v-model="email"
            placeholder="Email"/>
          <br />
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="password"/>
          <br />
          <div v-html="error" class='error'></div>
          <br />
          <v-btn class="grey" dark @click="register">Register</v-btn>

        </div>
      </div>
    </v-flex>
  </v-layout>



</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

  body{
    background-color: #3f4141;
  }
  .error{
    color: red;
  }
</style>
