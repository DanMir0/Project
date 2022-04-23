<template>
    <div class="document">
        <v-card>
            <v-form v-model="validForm" ref="form">
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                    <v-spacer/>
                    <print-dialog v-if="isPrint">
                        <print-documents-income :document="entity" v-if="isIncome"/>
                        <print-documents-outcome :document="entity" v-else/>
                    </print-dialog>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="1">
                                <v-text-field
                                    disabled
                                    v-model="entity.id"
                                    label="Код"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="entity.document_type_id"
                                    :rules="[$rules.required]"
                                    :items="document_types"
                                    item-text="name"
                                    item-value="id"
                                    label="Тип документа"
                                >
                                    <template v-slot:item="{ item }"
                                    >{{ item.id }} - {{ item.name }}
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <select-counterparties
                                    v-model="entity.counterparty_id"
                                    :rules="[$rules.required]"
                                    label="Контрагенты"
                                >
                                </select-counterparties>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    type="date"
                                    v-model="entity.created_at"
                                    disabled
                                    label="Дата создания"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <child-products :products.sync="entity.products"></child-products>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn outlined @click="back">Назад</v-btn>
                    <v-btn color="primary" @click="save">Сохранить</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import api from "@/services/api";
import validations from "@/mixins/validations";
import ChildProducts from "@/components/ChildProducts";
import SelectCounterparties from "@/components/SelectCounterparties";
import PrintDocumentsIncome from "@/components/print/PrintDocumentsIncome";
import PrintDocumentsOutcome from "@/components/print/PrintDocumentsOutcome";
import {INCOME} from "@/common/document_types";

export default {
    name: "Document",
    components: {PrintDocumentsOutcome, ChildProducts, SelectCounterparties, PrintDocumentsIncome},
    mixins: [validations],
    props: {
        id: {},
    },
    data: () => ({
        entity: {
            products: []
        },
        document_types: [],
        counterparties: [],
        defaultItem: {
            products: [],
        },
    }),

    computed: {
        formTitle() {
            return this.id == -1 ? "Добавить" : "Редактировать";
        },
        isIncome() {
            return this.entity.document_type_id == INCOME
        },
        isPrint() {
            return this.id != -1
        }
    },

    created() {
        this.initialize();
    },
    watch: {
        id() {
            this.initialize();
        },
    },
    methods: {
        initialize() {
            this.counterparties = api.counterparties.list();
            this.document_types = api.document_types.list();
            if (this.id > -1) {
                this.entity = api.documents.show(this.id);
            } else {
                this.entity = JSON.parse(JSON.stringify(this.defaultItem));
            }
        },

        save() {
            if (!this.validate()) return;
            let id = null;
            try {
                if (this.id > -1) {
                    api.documents.update(this.entity);
                    this.initialize()
                } else {
                    id = api.documents.create(this.entity);
                }
            } catch (e) {
                this.$dialog.alert(e);
                console.error(e)
                return;
            }
            if (id) this.$router.push(`/documents/${id}`);
            this.$dialog.success("Сохранено!");
        },

        back() {
            this.$router.push(`/documents`);
        },
    },
};
</script>
