<template>
  <v-layout align-center >
    <v-flex xs6 offset-xs3>
        <panel title='Register'>
          <form
          autocomplete="off">
          <v-text-field
            type="email"
            name="email"
            v-model="email"
            label="Email"></v-text-field>
          <br />
          <v-text-field
            type="password"
            name="password"
            v-model="password"
            label="password"
            autocomplete="new-password"></v-text-field>
          <br />
          <div v-html="error" class='error'></div>
          <br />
          <v-btn class="grey" dark @click="register">Register</v-btn>
        </form>
        </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  components: {
    Panel
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setAccessLevel', response.data.user.accessLevel)
        this.$router.push({name: 'root'})
        // console.log(response.data)
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
    color: black;
  }
</style>
