<template>
  <div class="order_status">
    <v-card>
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
              <v-text-field
                  v-model="entity.name"
                  label="Наименование"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn outlined @click="back">Назад</v-btn>
        <v-btn color="primary" @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "OrderStatus",
  props: {
    id: {},
  },
  data: () => ({
    entity: {},
    defaultItem: {
      name: "",
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
      if (this.id > -1) {
        this.entity = api.order_statuses.show(this.id);
      } else {
        this.entity = { ...this.defaultItem };
      }
    },

    save() {
      if (this.id > -1) {
        api.order_statuses.update(this.entity);
      } else {
        let id = api.order_statuses.create(this.entity);
        this.$router.push(`/order_statuses/${id}`);
      }
    },

    back() {
      this.$router.push(`/order_statuses`);
    },
  },
};
</script>
