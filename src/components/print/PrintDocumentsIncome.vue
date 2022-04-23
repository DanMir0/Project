<template>
    <div class="container">
        <h1 align="center">Приходная накладная № {{ document.id }} от {{ document.created_at }}</h1>
        <p class="font-italic font-weight-black">Поставщик: {{ counterparty.name }}, {{ counterparty.address }}, ИНН
            {{ counterparty.inn }}</p>
        <p class="font-italic font-weight-black">Покупатель: {{ organization.name }}</p>
        <p class="font-italic font-weight-black">Склад: Основной склад</p>
        <table>
            <thead></thead>
            <th>Код</th>
            <th>Наименование</th>
            <th>Ед. изм.</th>
            <th>Количество</th>
            <tr v-for="item in document.products" :key="item.id">
                <td align="center">{{ item.product_id }}</td>
                <td>{{ item.name }}</td>
                <td align="center">{{ item.measuring_unit_name }}</td>
                <td align="right">{{ item.quantity }}</td>
            </tr>
        </table>
        <div class="сaption">
            <p>Отпустил</p>
            <hr class="indent">
            <p>Получил</p>
            <hr>
        </div>
    </div>
</template>

<script>
import api from "@/services/api";

export default {
    name: "PrintDocumentsIncome",
    props: {
        document: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            organization: {},
            counterparty: {}
        }
    },
    watch: {
        document: {
            immediate: true,
            handler() {
                this.organization = api.settings.getOrganization()
                this.counterparty = api.counterparties.show(this.document.counterparty_id)
            }
        }
    }


}
</script>

<style scoped>
.container {
    color: black;
}

h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.font-weight-black {
    font-size: 0.875rem;
    margin-left: 67px;
}

th {
    border: 1px solid black;
}

.сaption {
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
}

hr {
    color: black;
    margin-top: 20px;
    width: 50%;
}

.сaption p {
    margin: 0;
}

.indent {
    margin-right: 20px;
}

</style>
