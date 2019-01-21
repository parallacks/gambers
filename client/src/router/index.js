import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register'
import Login from '../components/Login'
import Trips from '../components/Trips'
import ViewTrip from '../components/ViewTrip'
import CreateTrip from '../components/CreateTrip'
import ManageUsers from '../components/ManageUsers'
import Home from '../components/Home'
import Reservation from '../components/Reservation'
import User from '../components/User'
import EditTrip from '../components/EditTrip'
import ViewReservations from '../components/ViewReservations'
import About from '../components/About'
import ManageSite from '../components/ManageSite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/trips',
      name: 'Trips',
      component: Trips
    },
    {
      path: '/trips/:tripId',
      name: 'ViewTrip',
      component: ViewTrip
    },
    {
      path: '/createtrip',
      name: 'CreateTrip',
      component: CreateTrip
    },
    {
      path: '/edittrip/:tripId',
      name: 'EditTrip',
      component: EditTrip
    },
    {
      path: '/manageusers',
      name: 'ManageUsers',
      component: ManageUsers
    },
    {
      path: '/reservation/:tripId',
      name: 'ReservationWithId',
      component: Reservation
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/managerusers/:userId',
      name: 'User',
      component: User
    },
    {
      path: '/viewreservations',
      name: 'ViewReservations',
      component: ViewReservations
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/managesite',
      name: 'ManageSite',
      component: ManageSite
    }
  ]
})
