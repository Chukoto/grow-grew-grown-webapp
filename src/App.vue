<template>
  <v-app>
    <NaviDrawer />
    <v-main>
      <router-view />
    </v-main>
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
