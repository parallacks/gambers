<template>
  <v-layout >

    <v-flex xs6 offset-xs3 v-if="$store.state.accessLevel> 0">
      <panel title="Trip Metadata">
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
        <div class="danger-alert" v-if="error">
          {{error}}
        </div>
        <v-btn
          dark
          @click="create">Create</v-btn>
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
import Panel from '../components/Panel'
import TripsService from '../services/TripsService'
export default {
  data () {
    return {
      menu: null,
      menu1: null,
      type_options: ['Casino', 'Cruise'],
      trip: {
        name: null,
        destination: null,
        departure_city: null,
        trip_type: null,
        trip_size: null,
        start_date: null,
        end_date: null,
        location_image_url: null,
        description: null,
        active: 0
      },
      snackbarText: '',
      snackbar: false,
      required: (value) => !!value || 'Required',
      error: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
      // TODO Make this validate correctly with the active not being switched on
      this.error = null
      const areAllFieldsFilled = Object
        .keys(this.trip)
        .every(key => !!this.trip[key])
      if (!areAllFieldsFilled) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        const trip = await TripsService.post(this.trip)
        console.log(trip)
        await this.$router.push({
          name: 'ViewTrip',
          params: {tripId: trip.data.id}
        })
      } catch (err) {
        this.snackbarText = 'Unable to create trip'
        this.snackbar = true
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
