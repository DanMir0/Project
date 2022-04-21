<template>
  <div class="products">
    <v-data-table
        :headers="headers"
        :items="items"
        sort-by="calories"
        class="elevation-1"

    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Товары</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="newItem()" color="primary">Добавить
            <v-icon right>mdi-account-plus</v-icon>
          </v-btn>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
              >Вы уверены, что хотите удалить этот элемент?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                >Отмена
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ОК
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Products",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: "Код", value: "id"},
      {text: "Наименование", align: "start", value: "name"},
      {text: "Единица измерения", align: "center", value: "measuring_unit_name"},
      {text: "Остатки", value: "quantity"},
      {text: "Действия", value: "actions", sortable: false},
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
        id: 0,
      name: "",
        measuring_unit_name: '',
        quantity: 0,
    },
    defaultItem: {
        id: 0,
        name: "",
        measuring_unit_name: '',
        quantity: 0,
    },
  }),

  computed: {},

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.items = api.products.list();
    },

    editItem(item) {
      this.$router.push(`/products/${item.id}`);
    },

    newItem() {
      this.$router.push(`/products/-1`);
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      api.products.delete(this.editedItem.id);
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
