<template>
  <div>
    <select-counterparties
        v-model="settings.CUSTOMER_ID"
        :rules="[$rules.required]"
        label="Контрагенты"
    >
    </select-counterparties>
    <button @click="save()">SAVE</button>
  </div>
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
  methods: {
    save() {
      api.settings.save(this.settings);
    }
  }
}

</script>

<style scoped>

</style>