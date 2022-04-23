<template>
    <v-autocomplete
        v-bind="$attrs"
        v-on="$listeners"
        :items="counterparties"
        item-text="name"
        item-value="id"
    >
        <template v-slot:item="{ item }">
            {{ item.id }} - {{ item.name }}
        </template>
    </v-autocomplete>
</template>

<script>
import api from "../services/api";

export default {
    name: "SelectCounterparties",
    props: {},
    data() {
        return {
            counterparties: [],
        }
    },
    created() {
        this.counterparties = api.counterparties.list()
    }

}
</script>

<style scoped>

</style>
