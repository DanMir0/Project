<template>
    <v-data-table :headers="headers" :items="documents" dense>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Документы</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import api from "@/services/api";

export default {
    name: "ChildDocuments",
    props: [
        'order_id',
        'order_status_id'
    ],
    data: () => ({
        headers: [
            { text: "Тип документа", value: "document_type_name" },
            { text: "Номер заказа", value: "order_id" },
            { text: "Дата создания", value: "created_at" },
            { text: "", value: "actions", sortable: false },
        ],
        documents: [],
    }),
    watch: {
        order_id: {
            immediate: true,
            handler() {
                this.initialize()
            }
        },
        order_status_id() {
            this.initialize()
        }
    },
    methods: {
        initialize() {
            this.documents = api.documents.list({ order_id: this.order_id })
        },
        editItem(item) {
            this.$router.push(`/documents/${item.id}`);
        },
    },
};
</script>
