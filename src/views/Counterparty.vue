<template>
  <div class="counterparty">
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
                <v-text-field
                    v-model="entity.name"
                    :rules="[$rules.required, $rules.validationName]"
                    label="Наименование"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="entity.contact_info"
                    :rules="[$rules.required, $rules.validationPhone]"
                    label="Контактные данные"
                    v-mask="mask"
                    placeholder="+7 (000) 000-00-00"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="entity.address"
                    :rules="[$rules.required, $rules.validationAdress]"
                    label="Адрес"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="entity.inn"
                    :rules="[$rules.required, $rules.validationInn]"
                    label="ИНН"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    type="date"
                    disabled
                    v-model="entity.created_at"
                    label="Дата создания"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    type="date"
                    disabled
                    v-model="entity.updated_at"
                    label="Обновленная дата"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
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
  name: "Counterparty",
  mixins: [validations],
  props: {
    id: {},
  },
  data: () => ({
    entity: {},
    defaultItem: {
      name: "",
      contact_info: "",
      address: "",
      inn: "",
      created_at: "",
      updated_at: "",
      timestamp: "",
    },
    mask: [
      "+",
      /\d/,
      " (",
      /\d/,
      /\d/,
      /\d/,
      ")",
      " ",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
    ],
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
        this.entity = api.counterparties.show(this.id);
      } else {
        this.entity = {...this.defaultItem};
      }
    },

    save() {
      if (!this.validate()) return;
      let id = null;
      try {
        if (this.id > -1) {
          api.counterparties.update(this.entity);
        } else {
          id = api.counterparties.create(this.entity);
        }
      } catch (e) {
        this.$dialog.alert(e);
        return;
      }
      if (id) this.$router.push(`/counterparties/${id}`);
      this.$dialog.success("Сохранено!");
    },

    back() {
      this.$router.push(`/counterparties`);
    },
  },
};
</script>
