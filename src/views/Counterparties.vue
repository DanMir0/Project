<template>
  <div class="counterparties">
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Контрагенты</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="newItem()">Добавить</v-btn>
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
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Counterparties",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Наименование", align: "start", value: "name" },
      { text: "Контактные данные", align: "start", value: "contact_info" },
      { text: "Адрес", align: "start", value: "address" },
      { text: "ИНН", align: "start", value: "inn" },
      { text: "Действия", value: "actions", sortable: false, align: "center" },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
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
      this.items = api.counterparties.list();
    },

    editItem(item) {
      this.$router.push(`/counterparties/${item.id}`);
    },

    newItem() {
      this.$router.push(`/counterparties/-1`);
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      api.counterparties.delete(this.editedItem.id);
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
