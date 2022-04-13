<template>

</template>

<script>

import api from "@/services/api";

export default {
  name: "Settings",
  data: () => ({
    settings: {},
}),
created() {
    this.settings = api.settings.load();
},
  updated() {
    this.settings = api.settings.update()
  }
}

</script>

<style scoped>

</style>