<template>
  <table>
    <thead></thead>
    <tr v-for="item in data" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
    </tr>
  </table>
</template>

<script>
import api from "@/services/api";

export default {
  name: 'PrintProducts',
  data() {
    return {
      data:[]
    }
  },
  mounted() {
    this.data = api.products.list()
  }
}
</script>

<style scoped>

</style>