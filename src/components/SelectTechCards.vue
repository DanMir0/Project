<template>
    <v-autocomplete
        v-bind="$attrs"
        v-on="$listeners"
        :items="tech_cards"
        item-text="product_name"
        item-value="id"
        label="Товар"
    >
        <template v-slot:item="{ item }">
            {{ item.product_id }} - {{ item.product_name }}
        </template>
    </v-autocomplete>
</template>

<script>
import api from "../services/api";

export default {
    name: "SelectTechCards",
    props: {},
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
