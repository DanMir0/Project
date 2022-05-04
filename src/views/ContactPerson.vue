<template>
    <div class="contact_persons">
        <v-card>
            <v-form v-model="validForm" ref="form"
            >
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
                                    v-model="entity.full_name"
                                    :rules="[$rules.required, $rules.validationName]"
                                    label="ФИО"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="entity.contact_info"
                                    :rules="[$rules.required, $rules.validationPhone]"
                                    v-mask="mask"
                                    placeholder="+7 (000) 000-00-00"
                                    label="Контактные данные"
                                ></v-text-field>
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
import validations from "@/mixins/validations";
import api from "@/services/api";

export default {
    name: "ContactPerson",
    mixins: [validations],
    props: {
        id: {},
    },
    data: () => ({
        entity: {},
        defaultItem: {
            full_name: "",
            contact_info: "",
            counterparty_id: "",
        },
        mask: [
            "+",
            /\d/,
            " (",
            /\d/,
            /\d/,
            /\d/,
            ")",
            " ",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
        ],
    }),

    computed: {
        formTitle() {
            return this.id == -1 ? "Добавить" : "Редактировать";
        },
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
            if (this.id > -1) {
                this.entity = api.contact_persons.show(this.id);
            } else {
                this.entity = {...this.defaultItem};
            }
        },

        save() {
            if (!this.validate()) return;
            let id = null;
            try {
                if (this.id > -1) {
                    api.contact_persons.update(this.entity);
                } else {
                    id = api.contact_persons.create(this.entity);
                }
            } catch (e) {
                this.$dialog.alert(e);
                return;
            }
            if (id) this.$router.push(`/contact_persons/${id}`);
            this.$dialog.success("Сохранено!");
        },

        back() {
            this.$router.push(`/contact_persons`);
        },
    },
}
</script>

<style scoped>

</style>
