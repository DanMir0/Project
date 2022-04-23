<template>
  <v-autocomplete
      v-bind="$attrs"
      v-on="$listeners"
      :items="products"
      item-text="name"
      item-value="id"
      label="Товар"
  >
    <template v-slot:item="{ item }">
      {{ item.id }} - {{ item.name }}
    </template>
  </v-autocomplete>
</template>

<script>
import api from "../services/api";

export default {
  name: "SelectProducts",
  props: {
  },
  data() {
    return {
      products: [],
    }
  },
  created() {
    this.products = api.products.list()
  }

}
</script>

<style scoped>

</style>
