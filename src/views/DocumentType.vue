<template>
    <div class="document__type">
        <v-card>
            <v-form v-model="validForm" ref="form">
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
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
                                <v-text-field
                                    v-model="entity.name"
                                    :rules="[$rules.required, $rules.validationName]"
                                    label="Наименование"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="entity.in_out"
                                    v-bind="$attrs"
                                    v-on="$listeners"
                                    :items="items"
                                    item-text="name"
                                    item-value="value"
                                >
                                    <template v-slot:item="{ item }">
                                        {{ item.name }}
                                    </template>
                                </v-select>
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

export default {
    name: "DocumentType",
    mixins: [validations],
    alerts: false,
    props: {
        id: {},
    },
    data: () => ({
        entity: {},
        items : [ { name: "Приход", value: "IN" }, { name: "Расход", value: "OUT"}],
        defaultItem: {
            name: "",
            in_out: "",
        },
    }),

    computed: {
        formTitle() {
            return this.id == -1 ? "Добавить" : "Редактировать";
        },
    },

    created() {
        this.initialize();
        // this.items = api.document_types.list();
    },
    watch: {
        id() {
            this.initialize();
        },
    },
    methods: {
        initialize() {
            if (this.id > -1) {
                this.entity = api.document_types.show(this.id);
            } else {
                this.entity = {...this.defaultItem};
            }
        },

        save() {
            if (!this.validate()) return;
            let id = null;
            try {
                if (this.id > -1) {
                    api.document_types.update(this.entity);
                } else {
                    id = api.document_types.create(this.entity);
                }
            } catch (e) {
                this.$dialog.alert(e);
                return;
            }
            if (id) this.$router.push(`/document_types/${id}`);
            this.$dialog.success("Сохранено!");
        },

        back() {
            if (this.id > -1) {
                this.$router.push(`/document_types`);
            } else {
                this.$router.push(`/document_types`);
            }
        },
    },
};
</script>
