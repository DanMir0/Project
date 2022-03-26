<template>
  <div class="document">
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
                  v-model="entity.document_type_id"
                  :rules="[$rules.required]"
                  :items="document_types"
                  item-text="name"
                  item-value="id"
                  label="Тип документа"
                >
                  <template v-slot:item="{ item }"
                    >{{ item.id }} - {{ item.name }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="entity.implementation"
                  :rules="[$rules.required]"
                  label="Реализация"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="entity.counterparty_id"
                  :items="counterparties"
                  :rules="[$rules.required]"
                  item-text="name"
                  item-value="id"
                  label="Контрагенты"
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
      </v-form>
    </v-card>
  </div>
</template>

<script>
import api from "@/services/api";
import validations from "@/mixins/validations";

export default {
  name: "Document",
  mixins: [validations],
  props: {
    id: {},
  },
  data: () => ({
    entity: {},
    counterparties: [],
    document_types: [],
    defaultItem: {
      document_type_id: "",
      implementation: "",
      counterparty_id: "",
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
      this.counterparties = api.counterparties.list();
      this.document_types = api.document_types.list();
      if (this.id > -1) {
        this.entity = api.documents.show(this.id);
      } else {
        this.entity = { ...this.defaultItem };
      }
    },

    save() {
      if (!this.validate()) return;
      let id = null;
      try {
        if (this.id > -1) {
          api.documents.update(this.entity);
        } else {
          id = api.documents.create(this.entity);
        }
      } catch (e) {
        this.$dialog.alert("Ошибка: Введите корректные данные" + e);
        return;
      }
      if (id) this.$router.push(`/documents/${id}`);
      this.$dialog.success("Сохранено!");
    },

    back() {
      if (this.id > -1) {
        this.$router.push(`/documents`);
      } else {
        this.$router.push(`/documents`);
      }
    },
  },
};
</script>
