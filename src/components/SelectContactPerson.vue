<template>
    <v-autocomplete
        v-bind="$attrs"
        v-on="$listeners"
        :items="contact_persons"
        item-text="full_name"
        item-value="id"
    >
        <template v-slot:item="{ item }">
            {{ item.id }} - {{ item.full_name }}
        </template>
    </v-autocomplete>
</template>

<script>
import api from "@/services/api";

export default {
    name: "SelectContactPerson",
    props: {},
    data() {
        return {
            contact_persons: [],
        }
    },
    created() {
        this.contact_persons = api.contact_persons.list()
    }
}
</script>

<style scoped>

</style>
