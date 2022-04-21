<template>
    <div class="container">
        <h1 align="center">Заказ на производство № {{ order.id }} от {{ order.created_at }}</h1>
        <p class="font-italic font-weight-black">Заказчик: {{ counterparty.name }} Телефон: {{ counterparty.contact_info }}</p>
        <p class="font-italic font-weight-black">Производитель: {{ organization.name }}</p>
        <table>
            <thead></thead>
            <th>№</th>
            <th>Код</th>
            <th>Товар</th>
            <th>Ед. изм.</th>
            <th>Количество</th>
            <tr v-for="item in order.tech_cards" :key="item.id">
                <td align="center">{{ order.id }}</td>
                <td align="center">{{ item.product_id }}</td>
                <td>{{ item.product_name }}</td>
                <td align="center">{{ measuring_unit.measuring_unit_name }}</td>
                <td align="right">{{ item.quantity}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import api from "@/services/api";


export default {
    name: "PrintDocumentsOrders",
    props: {
        order: {
            type:Object,
            required: true,
        },
    },
    data() {
        return {
            organization: {},
            measuring_unit: {},
            counterparty: {},
        }
    },
    watch:{
        order:{
            immediate:true,
            handler(){
                this.measuring_unit = api.tech_cards.getProducts(this.order.tech_cards[0].tech_card_id)[0]
                this.organization = api.settings.getOrganization()
                this.counterparty = api.counterparties.show(this.order.counterparty_id)
            }
        }
    },



}
</script>

<style scoped>
h1 {
    margin-bottom: 15px;
}
p {
    margin-left: 20px;
}
</style>
