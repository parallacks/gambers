<template>
<v-layout>
  <v-flex xs8 offset-xs2>
    <panel title="Manage Site Data">
      <v-layout row>
        <v-flex xs-6>
          <panel title="Manage Review Data">
          </panel>
        </v-flex>
      </v-layout>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import Panel from '../components/Panel'
export default {
  name: 'ManageSite',
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
