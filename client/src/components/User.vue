<template>
  <panel :title=this.user.username>
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
      v-model="user.access_level"></v-text-field>
    <v-btn :disabled="!this.changes" @click="saveChanges()">Save</v-btn>
  </panel>
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
      changes: true
    }
  },
  async mounted () {
    const userId = this.$store.state.route.params.userId
    const tempUser = await UserService.show(userId)
    this.user = tempUser.data
    this.oldUserData = JSON.parse(JSON.stringify(this.user))
    console.log(this.user)
  },
  components: {
    Panel
  },
  methods: {
    async saveChanges () {
      try {
        await UserService.update(this.user.id, this.user)
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    user: {
      handler () {
        if (this.oldUserData != null) {
          if (JSON.stringify(this.user) === JSON.stringify(this.oldUserData)) {
            this.changes = false
          } else {
            this.changes = true
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
