import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Trips from '@/components/Trips'
import ViewTrip from '@/components/ViewTrip'
import CreateTrip from '@/components/CreateTrip'
import ManageUsers from '@/components/ManageUsers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
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
      path: '/manageusers',
      name: 'ManageUsers',
      component: ManageUsers
    }
  ]
})
