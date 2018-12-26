<template>
  <v-layout justify-center >
    <v-flex xs10>
      <panel title='Trips'>
        <v-card>
          <v-container
            fluid
            grid-list-md>
            <v-layout
              row
              wrap>
              <v-flex
                v-for="trip in trips"
                xs4
                :key="trip.name">
                <v-card>
                  <v-img
                    :src="trip.locationImageURL"
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
                   <v-spacer></v-spacer>
                     <v-btn
                      dark
                      class='black'
                      @click="navigateTo({name:'ViewTrip', params:{tripId: trip.id}})">
                       More Info
                     </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
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
      trips: []
    }
  },
  components: {
    Panel
  },
  async mounted () {
    // Request all the songs
    this.trips = (await TripsService.index()).data
    console.log(this.trips)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.trip{
  padding: 20px;
  height: 330px;
  overflow: hidden;
  background-color: rgb(205, 200, 200);
}
.trip-image{
  width: 70%;
  margin: 0 auto;
}
.trip-title{
  font-size: 30px;
}
.trip-location{
  font-size: 24px;
}
.trip-size{
  font-size: 18px;
}
</style>
