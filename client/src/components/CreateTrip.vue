<template>
  <v-layout>
    <panel title="Song Metadata">
      <v-text-field
        label="Title"
        v-model="name">
      </v-text-field>
      <v-text-field
        label="Location"
        v-model="location"
      ></v-text-field>
    </panel>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      name: null,
      location: null,
      minPlayerRating: null,
      startDate: null,
      endDate: null,
      locationImageURL: null
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
