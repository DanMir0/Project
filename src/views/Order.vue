<template>
    <div class="order">
        <v-card>
            <v-form v-model="validForm" ref="form">
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                    <v-spacer />
                    <print-dialog v-if="isPrint">
                        <print-orders :order="entity" />
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
                                    v-model="entity.order_status_id"
                                    :items="order_statuses"
                                    disabled
                                    item-text="name"
                                    item-value="id"
                                    label="Статус производства"
                                >
                                    <template v-slot:item="{ item }">
                                        {{ item.id }} - {{ item.name }}
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
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    type="date"
                                    v-model="entity.updated_at"
                                    disabled
                                    label="Обновленная дата"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    type="date"
                                    v-model="entity.finished_at"
                                    disabled
                                    label="Дата окончания"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <template>
                            <v-card>
                                <v-toolbar flat elevation="0">
                                    <template>
                                        <v-tabs v-model="tabs" left>
                                            <v-tab
                                                v-for="item in itemsTab"
                                                :key="item"
                                            >
                                                {{ item }}
                                            </v-tab>
                                        </v-tabs>
                                    </template>
                                </v-toolbar>

                                <v-tabs-items v-model="tabs">
                                    <v-tab-item>
                                        <child-tech-cards
                                            :tech_cards.sync="entity.tech_cards"
                                        ></child-tech-cards>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <child-documents
                                            :order_id="id"
                                            :order_status_id="
                                                entity.order_status_id
                                            "
                                        ></child-documents>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </template>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <template v-if="!isNew">
                        <v-btn
                            v-if="isNewStatus"
                            outlined
                            @click="setStatusProgress"
                            >В производство</v-btn
                        >
                        <v-btn
                            v-if="isProgressStatus"
                            outlined
                            @click="setStatusFinish"
                            >Готов</v-btn
                        >
                        <v-btn
                            v-if="isFinished"
                            outlined
                            @click="setStatusIssued"
                            >Выдача</v-btn
                        >
                    </template>

                    <v-btn outlined @click="back">Назад</v-btn>
                    <v-btn color="primary" @click="save" :disabled="!isNewStatus">Сохранить</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import api from "@/services/api";
import validations from "@/mixins/validations";
import ChildTechCards from "@/components/ChildTechCards";
import {
    STATUS_NEW,
    STATUS_IN_PROGRESS,
    STATUS_FINISHED,
    STATUS_ISSUED,
} from "@/common/order_statuses";
import { ErrorRedSaldo } from "@/services/api/errors/ErrorRedSaldo";
import PrintOrders from "@/components/print/PrintOrders";
import ChildDocuments from "@/components/ChildDocuments";

export default {
    name: "Order",
    components: { ChildTechCards, PrintOrders, ChildDocuments },
    mixins: [validations],
    props: {
        id: {},
    },
    data: () => ({
        itemsTab: ["Товары", "Документы"],
        tabs: null,
        entity: {
            tech_cards: [],
            order_status_id: 1,
            counterparty_id: "",
            created_at: "",
            updated_at: "",
            finished_at: "",
        },
        order_statuses: [],
        counterparties: [],
        defaultItem: {
            order_status_id: 1,
            counterparty_id: "",
            tech_cards: [],
            created_at: "",
            updated_at: "",
            finished_at: "",
        },
    }),

    computed: {
        formTitle() {
            return this.id == -1 ? "Добавить" : "Редактировать";
        },
        isNew() {
            return this.id == -1;
        },
        isNewStatus() {
            return this.entity.order_status_id == STATUS_NEW;
        },
        isProgressStatus() {
            return this.entity.order_status_id == STATUS_IN_PROGRESS;
        },
        isFinished() {
            return this.entity.order_status_id == STATUS_FINISHED;
        },
        isPrint() {
            return this.id != -1;
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
            this.order_statuses = api.order_statuses.list();
            this.counterparties = api.counterparties.list();
            if (this.id > -1) {
                this.entity = api.orders.show(this.id);
            } else {
                this.entity = JSON.parse(JSON.stringify(this.defaultItem));
            }
        },

        save() {
            if (!this.validate()) return;
            if (this.entity.tech_cards.length == 0) {
                this.$dialog.alert("Укажите товар!");
                return
            }
            let id = null;
            try {
                if (this.id > -1) {
                    api.orders.update(this.entity);
                    this.initialize();
                } else {
                    id = api.orders.create(this.entity);
                }
            } catch (e) {
                this.$dialog.alert(e);
                return;
            }
            if (id) this.$router.push(`/orders/${id}`);
            this.$dialog.success("Сохранено!");
        },

        back() {
            this.$router.push(`/orders`);
        },

        setStatus(status) {
            try {
                api.orders.setStatus(this.id, status);
            } catch (e) {
                if (e instanceof ErrorRedSaldo) {
                    this.$dialog
                        .alert(`Недостаточно материала «${e.product.name}» в объеме ${e.quantity}
                    ${e.product.measuring_unit_name}`);
                } else {
                    this.$dialog.alert(e);
                }
                console.error(e);
            }
            this.initialize();
        },

        setStatusProgress() {
            this.setStatus(STATUS_IN_PROGRESS);
        },

        setStatusFinish() {
            this.setStatus(STATUS_FINISHED);
        },
        setStatusIssued() {
            this.setStatus(STATUS_ISSUED);
        },
    },
};
</script>
