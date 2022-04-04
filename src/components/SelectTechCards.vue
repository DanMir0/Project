<template>
  <v-select
      v-bind="$attrs"
      v-on="$listeners"
      :items="tech_cards"
      item-text="name"
      item-value="id"
      label="Технологическая карта"
  >
    <template v-slot:item="{ item }">
      {{ item.id }} - {{ item.name }}
    </template>
  </v-select>
</template>

<script>
import api from "../services/api";

export default {
  name: "SelectTechCards",
  props: {
  },
  data() {
    return {
      tech_cards: [],
    }
  },
  created() {
    this.tech_cards = api.tech_cards.list()
  }

}
</script>

<style scoped>

</style>