<template>
  <v-app class="app">
    <debug-panel></debug-panel>
    <div class="app__wrapper">
      <side-bar></side-bar>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </div>
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
@import "@/assets/scss/main";

.app__wrapper {
  display: flex;
  height: 100vh;
}
</style>
