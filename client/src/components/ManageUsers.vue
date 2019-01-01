<template>
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
      :items="this.users"
      :search="this.search"

    >
      <template slot="items" slot-scope="props">
        <tr @click="navigateTo({name: 'User', params: {userId: props.item.id}})">
          <td>{{props.item.username}}</td>
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
          <td>{{props.item.access_level}}</td>
        </tr>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import Panel from '../components/Panel'
import UserService from '../services/UserService'
export default {
  data () {
    return {
      search: '',
      selected: [],
      users: [],
      accessLevel: ['Client', 'Administrator'],
      headers: [{
        text: 'Username',
        name: 'username',
        sortable: true
      }, {
        text: 'Email',
        name: 'email'
      },
      {
        text: 'First Name',
        name: 'first_name'
      }, {
        text: 'Last Name',
        name: 'last_name'
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
        text: 'Card Name',
        name: 'card_name'
      }, {
        text: 'Card Number',
        name: 'card_number'
      }, {
        text: 'Access Level',
        name: 'access_level'
      }

      ]
    }
  },
  components: {
    Panel
  },
  async mounted () {
    this.users = (await UserService.index()).data
    console.log(this.users)
    console.log(this.headers)
  },
  methods: {
    navigateTo (route) {
      console.log('hello')
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>
