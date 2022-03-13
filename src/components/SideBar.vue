<template>
  <v-navigation-drawer permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> СКЛАД </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
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
        { title: "Продукты", icon: "mdi-shopping", to: "/products" },
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
        { title: "Производство", icon: "mdi-call-made", to: "/productions" },
      ],
      right: null,
    };
  },
};
</script>
