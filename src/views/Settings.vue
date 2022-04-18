<template>
  <div>
    <select-counterparties
        v-model="settings.PRODUCTION_HALL"
        :rules="[$rules.required]"
        label="Производственный цех"
    >
    </select-counterparties>
      <select-counterparties
          v-model="settings.CUSTOMER_ID"
          :rules="[$rules.required]"
          label="Название организации"
      >
      </select-counterparties>
    <button @click="save()">Сохранить</button>
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
