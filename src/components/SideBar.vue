<template>
    <v-navigation-drawer
        class="side-bar"
        app
        floating
        permanent
        width="260"
    >
        <v-list-item>
            <v-list-item-content>
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

            <v-list-group

                prepend-icon="mdi-book-open-page-variant-outline"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Справочник</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="item in handbook"
                    :key="item.title"
                    :to="item.to"
                    link
                    active-class="primary white--text"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list-group>

            <v-list-item
                         link
                         @click="openHelp"
                         active-class="primary white--text">
                <v-list-item-icon>
                    <v-icon>mdi-help-circle</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Помощь</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
const { BrowserWindow } = require('electron').remote
export default {
    name: "SideBar",
    data() {
        return {
            printShow: false,
            items: [
                {title: "Товары", icon: "mdi-shopping", to: "/products"},
                {
                    title: "Контрагенты",
                    icon: "mdi-account-group",
                    to: "/counterparties",
                },
                {
                    title: "Документы",
                    icon: "mdi-file-document-outline",
                    to: "/documents",
                },
                {title: "Заказы", icon: "mdi-chart-line", to: "/orders"},
                {title: "Тех карты", icon: "mdi-credit-card", to: "/tech_cards"},
                {title: "Настройки", icon: "mdi-cog-outline", to: "/settings"},
               /* {title: "Помощь", icon: "mdi-help-circle", to: "/help"},*/
            ],
            handbook: [
                {title: "Единицы измерения", icon: "mdi-beaker-outline", to: "/measuring_units"},
                {title: "Статусы производства", icon: "mdi-clipboard-pulse-outline", to: "/order_statuses"},
                {
                    title: "Типы документов",
                    icon: "mdi-file-document-multiple-outline",
                    to: "/document_types",
                },
            ],
            right: null,
        };
    },
    methods: {
        openHelp() {
            console.log(BrowserWindow);
            const win = new BrowserWindow({ width: 800, height: 600 })

            // Or load a local HTML file
            win.loadFile('../db/help/Help.htm')
        }
    }
};
</script>

<style lang="scss">
.side-bar {
    .v-list--nav {
        padding-left: 0 !important;
    }
}

</style>
