<template>
  <div class="tech__card">
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
                  readonly
                  v-model="entity.id"
                  label="ID"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="entity.name"
                  :rules="[$rules.required]"
                  label="Наименование"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <select-products
                  v-model="entity.product_id"
                  :rules="[$rules.required]"
                  label="Готовая продукция"
                >
                  <template v-slot:item="{ item }">
                    {{ item.id }} - {{ item.name }}
                  </template>
                </select-products>
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
import ChildProducts from "@/components/ChildProducts";
import SelectProducts from "../components/SelectProducts";

export default {
  name: "TechCard",
  components: {SelectProducts, ChildProducts},
  mixins: [validations],
  props: {
    id: {},
  },
  data: () => ({
    entity: {
      products:[],
    },
    defaultItem: {
      name: "",
      product_id: "",
      products:[],
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
        this.entity = api.tech_cards.show(this.id);
      } else {
        this.entity = JSON.parse(JSON.stringify(this.defaultItem))
      }
    },

    save() {
      if (!this.validate()) return;
      let id = null;
      try {
        if (this.id > -1) {
          api.tech_cards.update(this.entity);
          this.initialize()
        } else {
          id = api.tech_cards.create(this.entity);
        }
      } catch (e) {
        this.$dialog.alert(e);
        return;
      }
      if (id) this.$router.push(`/tech_cards/${id}`);
      this.$dialog.success("Сохранено!");
    },

    back() {
      this.$router.push(`/tech_cards`);
    },
  },
};
</script>
