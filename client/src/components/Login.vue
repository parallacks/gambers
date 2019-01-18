<template>
  <v-layout align-center >
    <v-flex xs6 offset-xs3>
      <panel title='Log In'>
          <form autocomplete="off">
            <v-text-field
              name="username"
              v-model="username"
              label="Username"></v-text-field>
            <br />
            <v-text-field
              type="password"
              name="password"
              v-model="password"
              label="password"></v-text-field>

            <div v-html="error" class='error'></div>
            <br />
            <v-btn class="grey" dark @click="login">Login</v-btn>
          </form>

        <v-btn class ="grey registerLink" dark @click="navigateTo({name: 'Register'})">Don't have an account? Click here to register</v-btn>
        </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
import Panel from '../components/Panel'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  components: {
    Panel
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setAccessLevel', response.data.user.access_level)
        this.$router.push({name: 'root'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

  body{
    background-color: #A9BCD0;
  }
  .error{
    color: black;
  }
  .registerLink {
    color: crimson;
    background-color: dimgray;
  }
</style>
