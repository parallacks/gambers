<template>
<v-layout>
  <panel title = "About Us!">

  </panel>
</v-layout>
</template>

<script>
import Panel from '../components/Panel'
import UserService from '../services/UserService'
export default {
  name: 'About',
  data () {
    return {

    }
  },
  components: {
    Panel
  },
  async mounted () {
    this.users = (await UserService)
  }
}
</script>

<style scoped>

</style>
