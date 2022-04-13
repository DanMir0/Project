<template>
  <table>
    <thead></thead>
    <tr v-for="item in data" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.quantity}}</td>
    </tr>
  </table>
</template>

<script>
import api from "@/services/api";

export default {
  name: "PrintDocuments",
  data() {
    return {
      data:[]
    }
  },
  mounted() {
    this.data = api.documents.list()
  }
}
</script>

<style scoped>

</style>