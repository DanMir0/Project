<template>
  <div class="documents">
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Документы</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn @click="newItem()" color="primary">Добавить</v-btn>
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
  name: "Documents",
  data: () => ({
    dialog: false,
    search: "",
    dialogDelete: false,
    headers: [
      { text: "Тип документа", align: "start", value: "document_type_name" },
      { text: "Контрагенты", align: "start", value: "counterparty_name" },
      { text: "Заказ", align: "start", value: "order_id" },
      { text: "Дата создания", align: "start", value: "created_at" },
      { text: "Обновленная дата", align: "start", value: "updated_at" },
      { text: "Временная отметка", align: "start", value: "timestamp" },
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
      this.items = api.documents.list();
    },

    editItem(item) {
      this.$router.push(`/documents/${item.id}`);
    },

    newItem() {
      this.$router.push(`/documents/-1`);
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      api.documents.delete(this.editedItem.id);
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
