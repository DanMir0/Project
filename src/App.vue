<template>
  <v-app class="app">
    <div class="app__wrapp">
      <side-bar> </side-bar>
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
export default {
  name: "App",
  components: { SideBar },
};
</script>

<style>
.app__wrapp {
  display: flex;
  height: 100vh;
}
</style>
