<template>
  <v-layout >
    <v-flex  v-if="$store.state.accessLevel> 0">
      <panel title='Users'>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"></v-text-field>
          </v-card-title>
        </v-card>
        <v-data-table
          :headers="this.headers"
          :items="this.reservations"
          :search="this.search"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td><v-switch v-model="props.item.approval" @click="updateApproval(props.item.id, props.item.approval)">test</v-switch></td>
              <td>{{props.item.trip_departure}}</td>
              <td>{{props.item.trip_destination}}</td>
              <td>{{props.item.trip_start_date}}</td>
              <td>{{props.item.trip_end_date}}</td>
              <td>{{props.item.email}}</td>
              <td>{{props.item.first_name}}</td>
              <td>{{props.item.last_name}}</td>
              <td>{{props.item.phone_number}}</td>
              <td>{{props.item.street_address}}</td>
              <td>{{props.item.city}}</td>
              <td>{{props.item.state}}</td>
              <td>{{props.item.zip_code}}</td>
              <td>{{props.item.card_name}}</td>
              <td>{{props.item.card_number}}</td>
            </tr>
          </template>
        </v-data-table>
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
import Panel from '../components/Panel'
import ReservationService from '../services/ReservationService'
export default {
  name: 'ViewReservations',
  data () {
    return {
      search: '',
      selected: [],
      reservations: [],
      trips: [],
      users: [],
      headers: [{
        text: 'Approval Status',
        name: 'approval'
      }, {
        text: 'Trip Destination',
        name: 'destination'
      }, {
        text: 'Trip Departure',
        name: 'departure'
      }, {
        text: 'Trip Start Date',
        name: 'start_date'
      }, {
        text: 'Trip End Date',
        name: 'end_date'
      }, {
        text: 'First Name',
        name: 'first_name'
      }, {
        text: 'Last Name',
        name: 'last_name'
      }, {
        text: 'Email',
        name: 'email'
      }, {
        text: 'Phone Number',
        name: 'phone_number'
      }, {
        text: 'Street Address',
        name: 'street_address'
      }, {
        text: 'City',
        name: 'city'
      }, {
        text: 'State',
        name: 'state'
      }, {
        text: 'Zip Code',
        name: 'zip_code'
      }, {
        text: 'Card Name',
        name: 'card_name'
      }, {
        text: 'Card Number',
        name: 'card_number'
      }]
    }
  },
  components: {
    Panel
  },
  async mounted () {
    this.reservations = (await ReservationService.index()).data
  },
  methods: {
    async updateApproval () {
      console.log('Switch clicked')
    }
  }
}
</script>

<style scoped>

</style>
