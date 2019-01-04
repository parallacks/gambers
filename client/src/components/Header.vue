<template>
<v-toolbar scroll-off-screen fixed  class= "black" dark>
  <v-toolbar-title class="mr-4 link"
    @click="navigateTo({name:'root'})">
    <img src="../assets/gamblersExpressLogo.png" class="logo"/>
  </v-toolbar-title>
  <v-toolbar-items>
    <v-btn dark
    class= "black link"
      @click="navigateTo({name: 'Trips'})">
      View Trips
    </v-btn>
    <v-btn dark
     class= "black link"
     @click="navigateTo({name: 'Reservation'})">
      Request a Reservation
    </v-btn>
  </v-toolbar-items>
  <v-toolbar-items v-if="$store.state.accessLevel>0"  >
    <v-btn class= "black link adminTabs" dark @click="navigateTo({name:'CreateTrip'})" >
      Create Trip
    </v-btn>
    <v-btn class= "black link adminTabs" dark @click="navigateTo({name:'ManageUsers'})" >
      Manager Users
    </v-btn>
    <v-btn class= "black link adminTabs" dark @click="navigateTo({name:'ViewReservations'})" >
      View Registrations
    </v-btn>
  </v-toolbar-items>
  <v-spacer></v-spacer>
  <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
    <v-btn dark class= "black link" @click="navigateTo({name:'Login'})">
      Log in
    </v-btn>
    <v-btn dark class= "black link" @click="navigateTo({name:'Register'})">
      Sign-up
    </v-btn>
  </v-toolbar-items>
  <v-toolbar-items v-else>
    <v-btn dark class= "black link" @click="navigateTo({name: 'User', params: {userId: $store.state.user.id}})">
      Account Info
    </v-btn>
    <v-btn dark class= "black link" @click="logout">
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
      this.$store.dispatch('setAccessLevel', 0)
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
  color: #f7d12a;
}
.link:hover{
  background-color: #464646;
  color: #ffeb96;
}
.adminTabs{
  color: red;
}
.logo{
  width: 70px;
  height: 70px;
}
</style>
