<template>
<v-layout>
  <v-flex xs6 offset-xs3 v-if="$store.state.accessLevel> 0 || user.id === this.userId">
    <panel :title="'Editing information for: ' +this.trip.name">
      <v-btn @click="cloneTrip()">Clone Trip</v-btn>
      <v-btn @click="confirmDelete()">Delete Trip</v-btn>
      <v-text-field
        label="Title"
        required
        :rules = "[required]"
        v-model="trip.name">
      </v-text-field>
      <v-text-field
        label="Destination City"
        required
        :rules = "[required]"
        v-model="trip.destination"
      ></v-text-field>
      <v-text-field
        label="Departure City"
        required
        :rules = "[required]"
        v-model="trip.departure_city"
      ></v-text-field>
      <v-menu
        ref="menu1"
        :close-on-content-click="false"
        v-model="menu1"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="trip.start_date"
          label="Start Date"
          required
          :rules = "[required]"
          readonly
        ></v-text-field>
        <v-date-picker v-model="trip.start_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu1.save(trip.start_date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="trip.end_date"
          label="End Date"
          required
          :rules = "[required]"
          readonly
        ></v-text-field>
        <v-date-picker v-model="trip.end_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(trip.end_date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <v-text-field
        label="Trip Type"
        required
        :rules = "[required]"
        v-model="trip.trip_type"
      ></v-text-field>
      <v-text-field
        label="Trip Size"
        required
        :rules = "[required]"
        v-model="trip.trip_size"
      ></v-text-field>
      <v-text-field
        label="Thumbnail Picture"
        required
        :rules = "[required]"
        v-model="trip.location_image_url"
      ></v-text-field>
      <v-textarea
        outline
        label="Description"
        v-model="trip.description"
      ></v-textarea>
      <v-switch
        :label="'Active'"
        v-model="trip.active">
      </v-switch>
      <v-btn :disabled="!this.changes" @click="saveChanges()">Save</v-btn>
    </panel>
  </v-flex>
  <v-flex xs6 offset-xs3 v-else>
    <panel>
      Sorry you don't have the permission needed to access this page. If you believe this is an error please contact your site administrator.
    </panel>
  </v-flex>
  <v-snackbar
    v-model="confirmSnack"
    :timeout="6000"
    :top="true"
    :multi-line="true"
  >
    Are you sure you want to delete this trip? This cannot be undone.
    <v-btn
      color="pink"
      flat
      @click="confirmSnack = false"
    >
      Cancel
    </v-btn>
    <v-btn
      color = "red"
      flat
      @click="deleteTrip()">
      Confirm
    </v-btn>
  </v-snackbar>
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

import Panel from '../components/Panel'
import TripsService from '../services/TripsService'
export default {
  name: 'EditTrip',
  data () {
    return {
      menu: null,
      menu1: null,
      required: (value) => !!value || 'Required',
      trip: {},
      oldTripData: {},
      snackbarText: '',
      snackbar: false,
      changes: true,
      confirmSnack: false
    }
  },
  components: {
    Panel
  },
  async mounted () {
    if (this.$store.state.accessLevel > 0) {
      try {
        const tripId = this.$store.state.route.params.tripId
        this.trip = (await TripsService.show(tripId)).data
        this.oldTripData = JSON.parse(JSON.stringify(this.trip))
      } catch (err) {
        this.snackbarText = 'Sorry that trip couldn\'t be found'
        this.snackbar = true
      }
    }
  },
  methods: {
    async saveChanges () {
      try {
        await TripsService.update(this.trip.id, this.trip)
        const tripId = this.$store.state.route.params.tripId
        this.trip = (await TripsService.show(tripId)).data
        this.oldTripData = JSON.parse(JSON.stringify(this.trip))
        this.snackbarText = 'Changes saved successfully'
        this.snackbar = true
      } catch (err) {
        this.snackbarText = 'Unable to save changes to account'
        this.snackbar = true
      }
    },
    confirmDelete () {
      this.confirmSnack = true
    },
    async deleteTrip () {
      try {
        this.confirmSnack = false
        await TripsService.deleteTrip(this.trip.id)
        this.$router.push({name: 'Trips'})
      } catch (err) {
        console.log(err)
      }
    },
    async cloneTrip () {
      try {
        let trip = JSON.parse(JSON.stringify(this.trip))
        trip.name = this.trip.name + ' CLONE'
        trip.id = null
        trip = (await TripsService.post(trip)).data
        this.$router.push({name: 'ViewTrip', params: {tripId: trip.id}})
      } catch (err) {
        this.snackbarText = 'Unable to clone trip'
        this.snackbar = true
        console.log(err)
      }
    }
  },
  watch: {
    trip: {
      handler () {
        if (this.oldTripData != null) {
          this.changes = JSON.stringify(this.trip) !== JSON.stringify(this.oldTripData)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
