<template>
  <v-layout align-center >
    <v-flex xs8 offset-xs2>
      <panel title='Trips'>
        <div v-for="trip in trips" :key="trip.id">
          {{trip.name}}
          {{trip.location}}
          {{trip.minPlayerRating}}
        </div>
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
  }
}
</script>

<style scoped>

</style>
