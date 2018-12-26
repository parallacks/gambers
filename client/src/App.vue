<template>
<div id="app" class="grey">
  <v-app>
    <page-header/>
    <main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </main>
  </v-app>
</div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #a4a4aa;
}
.danger-alert{
  color: red;
}
body {
  background-color: #3f4141;
}
</style>
