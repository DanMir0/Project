<template>
  <div class="product">
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
              <v-text-field v-model="entity.name" label="name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="entity.measuring_unit" label="Единица измерения"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer>
          <v-btn color="blue darken-1" text @click="back">Назад</v-btn>
        </v-spacer>
        <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Product",
  props: {
    id: {},
  },
  data: () => ({
    entity: {},
    defaultItem: {
      name: "Добавить",
      measuring_unit: "Единица измерения",
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
        this.entity = api.products.show(this.id);
      } else {
        this.entity = { ...this.defaultItem };
      }
    },

    save() {
      if (this.id > -1) {
        api.products.update(this.entity);
      } else {
        let id = api.products.create(this.entity);
        this.$router.push(`/product/${id}`);
      }
      //this.$router.push(`/counterparties`)
    },

    back() {
      if (this.id > -1) {
        this.$router.push(`/products`);
      } else {
        this.$router.push(`/products`);
      }
    },
  },
};
</script>
