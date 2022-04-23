<template>
    <v-app class="app">
        <side-bar></side-bar>
        <v-main>
            <v-container fluid>
                <debug-panel></debug-panel>
                <snackbar></snackbar>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import DebugPanel from "@/components/DebugPanel";
import Snackbar from "@/components/Snackbar";

export default {
    name: "App",
    components: {Snackbar, DebugPanel, SideBar},
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
