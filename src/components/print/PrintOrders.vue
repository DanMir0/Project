<template>
  <table>
    <thead>Заказы</thead>
    <tr v-for="item in data" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.order_status_id }}</td>
      <td>{{ item.counterparty_id }}</td>
      <td>{{ item.created_at }}</td>
      <td>{{ item.updated_at }}</td>
    </tr>
  </table>
</template>

<script>
import api from "@/services/api";

export default {
  name: "PrintOrders",
  data() {
    return {
      data:[]
    }
  },
  mounted() {
    this.data = api.orders.list()
  },
}
</script>

<style scoped>

</style>