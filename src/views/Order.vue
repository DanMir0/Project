<template>
  <div class="order">
    <v-card>
      <v-form v-model="validForm" ref="form">
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    readonly
                    v-model="entity.id"
                    label="ID"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                    v-model="entity.order_status_id"
                    :rules="[$rules.required]"
                    :items="order_statuses"
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
                <v-select
                    v-model="entity.counterparty_id"
                    :rules="[$rules.required]"
                    :items="counterparties"
                    item-text="name"
                    item-value="id"
                    label="Контрагент"
                >
                  <template v-slot:item="{ item }">
                    {{ item.id }} - {{ item.name }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="entity.created_at"
                    :rules="[$rules.required]"
                    label="Дата создания"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="entity.updated_at"
                    :rules="[$rules.required]"
                    label="Обновленная дата"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="entity.timestamp"
                    :rules="[$rules.required]"
                    label="Временная отметка"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <child-tech-cards :tech_cards.sync="entity.tech_cards"></child-tech-cards>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
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
import ChildTechCards from "@/components/ChildTechCards";
import SelectTechCards from "../components/SelectTechCards";

export default {
  name: "Order",
  components: {SelectTechCards, ChildTechCards},
  mixins: [validations],
  props: {
    id: {},
  },
  data: () => ({
    entity: {
      tech_cards:[],
    },

    order_statuses: [],
    counterparties: [],
    defaultItem: {
      order_status_id: "",
      counterparty_id: "",
      tech_cards: [],
      created_at: "",
      updated_at: "",
      timestamp: "",
    },
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
      this.order_statuses = api.order_statuses.list();
      this.counterparties = api.counterparties.list();
      if (this.id > -1) {
        this.entity = api.orders.show(this.id);
      } else {
        this.entity = JSON.parse(JSON.stringify(this.defaultItem))
      }
    },

    save() {
      if (!this.validate()) return;
      let id = null;
      try {
        if (this.id > -1) {
          api.orders.update(this.entity);
          this.initialize()
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
  },
};
</script>
