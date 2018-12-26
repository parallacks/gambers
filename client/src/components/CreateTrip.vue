<template>
  <v-layout >

    <v-flex xs6 offset-xs3 v-if="$store.state.user.accessLevel"> 0>
      <panel title="Trip Metadata">
        <v-text-field
          label="Title"
          required
          :rules = "[required]"
          v-model="trip.name">
        </v-text-field>
        <v-text-field
          label="Location"
          required
          :rules = "[required]"
          v-model="trip.location"
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
            v-model="trip.startDate"
            label="Start Date"
            required
            :rules = "[required]"
            readonly
          ></v-text-field>
          <v-date-picker v-model="trip.startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu1.save(startDate)">OK</v-btn>
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
            v-model="trip.endDate"
            label="End Date"
            required
            :rules = "[required]"
            readonly
          ></v-text-field>
          <v-date-picker v-model="trip.endDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(endDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-text-field
          label="Minimum Player Score"
          required
          :rules = "[required]"
          v-model="trip.minPlayerRating"
        ></v-text-field>
        <v-text-field
          label="Trip Size"
          required
          :rules = "[required]"
          v-model="trip.tripSize"
        ></v-text-field>
        <v-text-field
          label="Thumbnail Picture"
          required
          :rules = "[required]"
          v-model="trip.locationImageURL"
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
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import TripsService from '@/services/TripsService'
export default {
  data () {
    return {
      menu: null,
      menu1: null,
      trip: {
        name: null,
        location: null,
        minPlayerRating: null,
        tripSize: null,
        startDate: null,
        endDate: null,
        locationImageURL: null,
        description: null,
        active: null
      },
      required: (value) => !!value || 'Required',
      error: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
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
        this.$router.push({
          name: 'ViewTrip',
          params: {tripId: trip.id}
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
