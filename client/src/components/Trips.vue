<template>
  <v-layout justify-center >
    <v-flex xs2>
      <panel title="Search">

      </panel>
    </v-flex>
    <v-flex xs10>
      <panel title='Trips'>
        <v-card>
          <v-container
            fluid
            dark
            grid-list-md>
            <v-layout
              row
              dark
              wrap>
                <v-card
                  v-for="trip in trips"
                  xs3
                  class = "trip_card"
                  dark
                  :key="trip.name">
                  <v-img
                    :src="trip.location_image_url"
                    height="200px">
                    <v-container
                      fill-height
                      fluid
                      class="headline white--text"
                      pa-2>
                      {{trip.title}}
                      <v-layout fill-height>
                        <v-flex xs12 align-start flexbox dark>
                          <span class="headline white--text" v-text="trip.name"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-actions>
                    <v-card-text>
                      {{new Date(trip.start_date).toLocaleDateString("en-US")}} -- {{new Date(trip.end_date).toLocaleDateString("en-US")}}
                    </v-card-text>
                   <v-spacer></v-spacer>
                    <v-btn
                      dark
                      class='black adminBtn'
                      v-if="$store.state.accessLevel > 0"
                      @click="navigateTo({name: 'EditTrip', params: {tripId: trip.id}})">
                      Edit Trip
                    </v-btn>
                     <v-btn
                      dark
                      class='black'
                      @click="navigateTo({name: 'ViewTrip', params: {tripId: trip.id}})">
                       More Info
                     </v-btn>
                  </v-card-actions>
                </v-card>
            </v-layout>
          </v-container>
        </v-card>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '../components/Panel'
import TripsService from '../services/TripsService'
export default {
  name: 'Trips',
  data () {
    return {
      trips: []
    }
  },
  components: {
    Panel
  },
  async mounted () {
    // Request all the songs
    this.trips = (await TripsService.index()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.trip_card{
  margin: 10px;
  width: 425px;
  overflow: hidden;
}
.adminBtn {
  color: red;
}
</style>
