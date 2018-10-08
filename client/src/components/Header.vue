<template>
<v-toolbar fixed class="black" dark>
  <v-toolbar-title class="mr-4 link"
    @click="navigateTo({name:'root'})">
    GamblersExpress
  </v-toolbar-title>
  <v-toolbar-items>
    <v-btn dark
      @click="navigateTo({name: 'Trips'})">
      View Trips
    </v-btn>
  </v-toolbar-items>
  <v-toolbar-items class="adminTabs" v-if="$store.state.accessLevel>0">
    <v-btn dark @click="navigateTo({name:'CreateTrip'})">
      Create Trip
    </v-btn>
  </v-toolbar-items>
  <v-spacer></v-spacer>
  <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
    <v-btn dark @click="navigateTo({name:'Login'})">
      Log in
    </v-btn>
    <v-btn dark @click="navigateTo({name:'Register'})">
      Sign-up
    </v-btn>
  </v-toolbar-items>
  <v-toolbar-items v-else>
    <v-btn dark @click="logout">
      Log out
    </v-btn>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.link{
  cursor: pointer;
}
.link:hover{
  background-color: #464646
}
.adminTabs{
  color: #0bcef4;
}
</style>
