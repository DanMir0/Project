<template>
  <v-navigation-drawer
      class="side-bar"
      app
      floating
      permanent
      width="260"
  >
    <v-list-item>
      <v-list-item-content >
        <div class="d-flex align-center">
          <v-avatar color="primary" rounded>
            <v-icon color="white" large>mdi-store</v-icon>
          </v-avatar>
          <div class="ml-3">
            <v-list-item-title><h2>Склад</h2></v-list-item-title>
            <v-list-item-subtitle class="caption">версия 0.1</v-list-item-subtitle>
          </div>
        </div>

      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list shaped dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to"
                   link
                   active-class="primary white--text">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      items: [
        { title: "Главная", icon: "mdi-view-dashboard-outline", to: "/" },
        { title: "Товары", icon: "mdi-shopping", to: "/products" },
        {
          title: "Контрагенты",
          icon: "mdi-account-group",
          to: "/counterparties",
        },
        {
          title: "Документы",
          icon: "mdi-file-document-edit-outline",
          to: "/documents",
        },
        { title: "Заказы", icon: "mdi-call-made", to: "/orders" },
        { title: "Тех карты", icon: "mdi-credit-card-plus", to: "/tech_cards" },
        {
          title: "Типы документов",
          icon: "mdi-file-document-outline",
          to: "/document_types",
        },
        { title: "Единицы измерения", icon: "mdi-credit-card-plus", to: "/measuring_units" },
        { title: "Статусы производства", icon: "mdi-credit-card-plus", to: "/order_statuses" },
      ],
      right: null,
    };
  },
};
</script>

<style lang="scss">
.side-bar {
  .v-list--nav {
    padding-left: 0 !important;
  }
}

</style>
