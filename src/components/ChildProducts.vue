<template>
  <v-data-table :headers="headers" :items="products" dense>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Материалы</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">
              Добавить из справочника
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="validForm" ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="8">
                      <select-products
                        v-model="editedItem.product_id"
                        :rules="[$rules.required]"
                      >
                      </select-products>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="editedItem.quantity"
                        :rules="[$rules.greater(0)]"
                      >
                        label="Количество" ></v-text-field
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import SelectProducts from "./SelectProducts";
import api from "@/services/api";
import validations from "@/mixins/validations";

export default {
  name: "ChildProducts",
  components: { SelectProducts },
  mixins: [validations],
  props: {
    products: { type: Array },
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Наименование", value: "name" },
      { text: "Количество", value: "quantity" },
      { text: "Единица измерения", value: "measuring_unit_name" },
      { text: "", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      measuring_unit_name: "",
      quantity: 0,
      product_id: null,
    },
    defaultItem: {
      name: "",
      measuring_unit_name: "",
      quantity: 0,
      product_id: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Добавить" : "Редактировать";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.products.splice(this.editedIndex, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.validate()) return;
      const product = api.products.show(this.editedItem.product_id);
      this.editedItem.name = product.name;
      this.editedItem.measuring_unit_name = product.measuring_unit_name;

      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
