<template>
  <v-layout align-center >
    <v-flex xs6 offset-xs3>
      <panel title='Register'>
        <form
          autocomplete="off">
          <v-text-field
            name="username"
            v-model="username"
            label="Username"></v-text-field>
          <br />
          <v-text-field
            type="password"
            name="password"
            v-model="password"
            label="Password"
            autocomplete="new-password"></v-text-field>
          <v-text-field
            type="password"
            name="password"
            v-model="confirm_password"
            label="Confirm Password"></v-text-field>
          <br />
          <v-btn class="grey" dark @click="register">Register</v-btn>
        </form>
      </panel>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :timeout="6000"
      :top="true"
    >
      {{ error }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      confirm_password: '',
      snackbar: false,
      error: ''
    }
  },
  components: {
    Panel
  },
  methods: {
    async register () {
      if (this.password === this.confirm_password) {
        try {
          const response = await AuthenticationService.register({
            username: this.username,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$store.dispatch('setAccessLevel', response.data.user.access_level)
          this.$router.push({name: 'root'})
        } catch (error) {
          this.error = error.response.data.error
          this.snackbar = true
        }
      } else {
        this.error = 'Please make sure that the passwords match'
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
    color: black;
  }
</style>
