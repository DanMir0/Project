<template>
  <div class="tech__card">
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
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="entity.product_id"
                :items="products"
                item-text="name"
                item-value="id"
                label="Готовая продукция"
              >
                <template v-slot:item="{ item }"
                  >{{ item.id }} - {{ item.name }}
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn outlined @click="back">Назад</v-btn>
        <v-btn color="primary" @click="save">Сохранить</v-btn>
      </v-card-actions>
      <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          color="success"
          shaped
          top
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "TechCard",
  props: {
    id: {},
  },
  data: () => ({
    entity: {},
    products: [],
    defaultItem: {
      name: "",
      product_id: "",
    },
    snackbar: false,
    text: "Сохранено!",
    timeout: 4000,
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
      this.products = api.products.list();
      if (this.id > -1) {
        this.entity = api.tech_cards.show(this.id);
      } else {
        this.entity = { ...this.defaultItem };
      }
    },

    save() {
        if (this.id > -1) {
          api.tech_cards.update(this.entity);
          this.snackbar = true;
        } else {
          let id = api.tech_cards.create(this.entity);
          this.$router.push(`/tech_cards/${id}`);
          this.snackbar = true;
        }
    },

    back() {
      if (this.id > -1) {
        this.$router.push(`/tech_cards`);
      } else {
        this.$router.push(`/tech_cards`);
      }
    },
  },
};
</script>
