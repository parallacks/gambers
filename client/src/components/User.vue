<template>
  <v-layout >

    <v-flex xs6 offset-xs3 v-if="$store.state.accessLevel> 0 || user.id === this.userId">
      <panel :title="'User Information for: ' +this.user.username">
        <v-text-field
          label="Username"
          box
          readonly
          v-model="user.username"></v-text-field>
        <v-text-field
          label="First Name"
          v-model="user.first_name"></v-text-field>
        <v-text-field
          label="Last Name"
          v-model="user.last_name"></v-text-field>
        <v-text-field
          label="Email"
          v-model="user.email"></v-text-field>
        <v-text-field
          label="Phone Number"
          v-model="user.phone_number"></v-text-field>
        <v-text-field
          label="Street Address"
          v-model="user.street_address"></v-text-field>
        <v-text-field
          label="City"
          v-model="user.city"></v-text-field>
        <v-text-field
          label="State"
          v-model="user.state"></v-text-field>
        <v-text-field
          label="Zip Code"
          v-model="user.zip_code"></v-text-field>
        <v-text-field
          label="Card Name"
          v-model="user.card_name"></v-text-field>
        <v-text-field
          label="Card Number"
          v-model="user.card_number"></v-text-field>
        <v-text-field
          label="Access Level"
          v-if="$store.state.accessLevel> 0"
          v-model="user.access_level"></v-text-field>
        <v-btn :disabled="!this.changes" @click="saveChanges()">Save</v-btn>
      </panel>
    </v-flex>
    <v-flex xs6 offset-xs3 v-else>
      <panel>
        Sorry you don't have the permission needed to access this page. If you believe this is an error please contact your site administrator.
      </panel>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :timeout="6000"
      :top="true"
    >
      {{ snackbarText }}
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
import UserService from '../services/UserService'
import Panel from '../components/Panel'
export default {
  name: 'User',
  data () {
    return {
      user: {},
      oldUserData: {},
      userId: 0,
      snackbarText: 'woot',
      snackbar: false,
      changes: true
    }
  },
  async mounted () {
    if (this.$store.state.isUserLoggedIn) {
      if (this.$store.state.accessLevel > 0 || this.$store.state.user.id === this.$store.state.route.params.userId) {
        const userId = this.$store.state.route.params.userId
        this.userId = this.$store.state.user.id
        const tempUser = await UserService.show(userId)
        this.user = tempUser.data
        this.oldUserData = JSON.parse(JSON.stringify(this.user))
      } else {
        this.userId = 0
      }
    }
  },
  components: {
    Panel
  },
  methods: {
    async saveChanges () {
      try {
        await UserService.update(this.user.id, this.user)
        const userId = this.$store.state.route.params.userId
        const tempUser = await UserService.show(userId)
        this.user = tempUser.data
        this.oldUserData = JSON.parse(JSON.stringify(this.user))
        this.snackbarText = 'Changes saved successfully'
        this.snackbar = true
      } catch (err) {
        this.snackbarText = 'Unable to save changes to account'
        this.snackbar = true
      }
    }
  },
  watch: {
    user: {
      handler () {
        if (this.oldUserData != null) {
          this.changes = JSON.stringify(this.user) !== JSON.stringify(this.oldUserData)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
