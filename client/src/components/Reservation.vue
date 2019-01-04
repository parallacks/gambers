<template>
<v-layout column>
  <v-flex xs10 offset-xs1>
    <panel :title="'Registration for: ' + this.trip.name" v-if="loadTrip">
      <v-layout row>
        <v-text-field
          readonly
          box
          label="Destination City"
          v-model="trip.destination"></v-text-field>
        <v-text-field
          readonly
          box
          label="Departure City"
          v-model="trip.departure_city"></v-text-field>
        <v-text-field
          readonly
          box
          label="Start Date"
          v-model="tripStartDate"></v-text-field>
        <v-text-field
          readonly
          box
          label="End Date"
          v-model="tripEndDate"></v-text-field>
      </v-layout>
    </panel>
    <panel :title="'Requesting a Reservation'" v-else>
      <v-layout row>
        <v-text-field
          required
          :rules = "[required]"
          v-model="trip.destination"
          label="Destination City"></v-text-field>
        <v-text-field
          required
          :rules = "[required]"
          v-model="trip.departure_city"
          label="Departure City"></v-text-field>
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
      </v-layout>
    </panel>
  </v-flex>
  <v-flex xs-4 offset-xs2>
    <panel :title="'Personal Information'">
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
      <v-textarea
        v-model="reservation.comment"
        outline
        label="Questions or Comments"></v-textarea>
      <div class="danger-alert" v-if="error">
        {{error}}
      </div>
      <v-btn
        @click="requestTrip()">Request Reservation now!</v-btn>
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
import ReservationService from '../services/ReservationService'
import UserService from '../services/UserService'
export default {
  name: 'Reservation',
  data () {
    return {
      menu: null,
      menu1: null,
      reservation: {
        trip_id: null,
        user_id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        street_address: null,
        city: null,
        state: null,
        zip_code: null,
        card_name: null,
        card_number: null,
        trip_departure: null,
        trip_destination: null,
        trip_start_date: null,
        trip_end_date: null,
        comment: null
      },
      trip: {
        name: null,
        departure_city: null,
        destination: null,
        trip_type: null,
        trip_size: null,
        start_date: null,
        end_date: null,
        location_image_url: null,
        description: null,
        active: 0
      },
      user: {
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        street_address: null,
        city: null,
        state: null,
        zip_code: null,
        card_name: null,
        card_number: null
      },
      loadTrip: false,
      userLoggedIn: false,
      tripStartDate: '',
      tripEndDate: '',
      snackbarText: 'woot',
      snackbar: false,
      error: '',
      required: (value) => !!value || 'Required'
    }
  },
  async mounted () {
    if (this.$store.state.route.params.tripId != null) {
      this.loadTrip = true
      const tripId = this.$store.state.route.params.tripId
      const tempTrip = await TripsService.show(tripId)
      this.trip = tempTrip.data
      this.tripStartDate = new Date(this.trip.start_date).toLocaleDateString('en-US')
      this.tripEndDate = new Date(this.trip.end_date).toLocaleDateString('en-US')
    }
    if (this.$store.state.isUserLoggedIn) {
      this.userLoggedIn = true
      const tempUser = await UserService.show(this.$store.state.user.id)
      this.user = tempUser.data
    }
  },
  components: {
    Panel
  },
  methods: {
    async requestTrip () {
      this.error = null
      const areAllFieldsFilled = this.checkForm()
      if (!areAllFieldsFilled) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        const reservationTemp = await ReservationService.post(this.reservation)
        const reservation = reservationTemp.data
        this.snackbarText = 'Reservation for ' + reservation.destination + ' was created successfully'
        this.snackbar = true
      } catch (err) {
        this.snackbarText = 'Sorry the reservation could not be created'
        this.snackbar = true
      }
    },
    checkForm: function () {
      if (this.reservation.trip_start_date &&
        this.reservation.trip_end_date &&
        this.reservation.trip_destination &&
        this.reservation.trip_departure &&
        this.reservation.first_name &&
        this.reservation.last_name &&
        this.reservation.street_address &&
        this.reservation.city &&
        this.reservation.state &&
        this.reservation.zip_code &&
        this.reservation.card_name &&
        this.reservation.card_number &&
        this.reservation.phone_number) {
        return true
      }
    }
  },
  watch: {
    tripStartDate: function (val) {
      this.trip.start_date = val
    },
    tripEndDate: function (val) {
      this.trip.end_date = val
    },
    user: {
      handler () {
        this.reservation.user_id = this.user.id
        this.reservation.first_name = this.user.first_name
        this.reservation.last_name = this.user.last_name
        this.reservation.email = this.user.email
        this.reservation.phone_number = this.user.phone_number
        this.reservation.street_address = this.user.street_address
        this.reservation.city = this.user.city
        this.reservation.state = this.user.state
        this.reservation.zip_code = this.user.zip_code
        this.reservation.card_name = this.user.card_name
        this.reservation.card_number = this.user.card_number
      },
      deep: true
    },
    trip: {
      handler () {
        this.reservation.trip_id = this.trip.id
        this.reservation.trip_destination = this.trip.destination
        this.reservation.trip_departure = this.trip.departure_city
        this.reservation.trip_start_date = this.trip.start_date
        this.reservation.trip_end_date = this.trip.end_date
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
