<template>
  <v-app>
    <NaviDrawer />
    <v-container class="wrapper" fluid>
      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import NaviDrawer from './components/NaviDrawer';
export default {
  name: 'App',
  components: {
    NaviDrawer,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.wrapper {
  margin-left: 256px;
}
</style>
