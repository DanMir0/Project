<template>
  <v-app class="app">
      <side-bar></side-bar>
      <v-main>
        <v-container fluid>
          <debug-panel></debug-panel>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import DebugPanel from "@/components/DebugPanel";

export default {
  name: "App",
  components: {DebugPanel, SideBar},
};
</script>

<style lang="scss">
.app {
  /*
  example of media
  @media #{map-get($display-breakpoints, 'md-and-down')} {
    display: none !important;
  }
  */
}


</style>
