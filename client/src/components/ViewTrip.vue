<template>
  <v-layout>
    <v-flex xs9>
      <panel v-bind:title="'Trip to ' + trip.name">
        <v-layout>
          <v-flex xs3>
            <img class= trip-image :src="trip.locationImageURL" />
          </v-flex>
          <v-flex xs4>
            {{trip.location }}
            <br />
            Starts: {{new Date(trip.startDate).toLocaleDateString("en-US")}}
            <br />
            Ends: {{new Date(trip.endDate).toLocaleDateString("en-US")}}
          </v-flex>
          <v-flex>
            <textarea
            readonly
            v-model="trip.description"></textarea>
          </v-flex>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import TripsService from '@/services/TripsService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      trip: {}
    }
  },
  async mounted () {
    const tripId = this.$store.state.route.params.tripId
    const tempTrip = await TripsService.show(tripId)
    this.trip = tempTrip.data
    console.log(this.trip)
    // TODO Something is broken here video 5, 7 mins in
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.trip-image{
  width: 70%;
  margin: 0 auto;
}
textarea{
  width: 100%;
  overflow: auto;
  height: 600px;
  border: none;
  border-style: none;
  border-color: transparent;
}
</style>
