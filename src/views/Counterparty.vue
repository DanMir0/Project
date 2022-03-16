<template>
  <div class="counterparty">
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
                  label="name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!--
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        -->
        <v-btn color="blue darken-1" text @click="save"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Counterparty",
  props: {
    id: {}
  },
  data: () => ({
    entity: {},
    defaultItem: {
      name: "New item",
    },
  }),

  computed: {
    formTitle() {
      return this.id === -1 ? "New Item" : "Edit Item";
    },
  },


  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      if (this.id > -1) {
        this.entity = api.counterparties.show(this.id)
      } else {
        this.entity = {...this.entity}
      }
    },

    save() {
      if (this.id > -1) {
        api.counterparties.update(this.entity)
      } else {
        api.counterparties.create(this.entity)
      }
      this.$router.push(`/counterparties`)
    },
  },
};
</script>
