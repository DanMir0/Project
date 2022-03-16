<template>
  <v-app class="app">
    <debug-panel></debug-panel>
    <div class="app__wrapper">
      <side-bar></side-bar>
      <v-main class="mx-2">
        <router-view></router-view>
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

<style>
.app__wrapper {
  display: flex;
  height: 100vh;
}
</style>
