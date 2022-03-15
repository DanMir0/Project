<template>
  <v-app class="app">
    <debug-panel></debug-panel>
    <div class="app__wrapp">
      <side-bar></side-bar>
      <v-main>
        <v-container>
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

<style>
.app__wrapp {
  display: flex;
  height: 100vh;
}
</style>
