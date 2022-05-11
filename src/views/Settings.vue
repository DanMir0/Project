<template>
    <div class="settings">
        <v-card>
            <v-toolbar flat elevation="0">
                <template>
                    <v-tabs v-model="tabs" left>
                        <v-tab
                            v-for="item in itemsTab"
                            :key="item"
                        >
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>

            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <v-card>
                        <v-form>
                            <v-card-text>
                                <v-container>
                                    <select-counterparties
                                        v-model="settings.PRODUCTION_HALL"
                                        :rules="[$rules.required]"
                                        label="Производственный цех"
                                    >
                                    </select-counterparties>
                                    <select-counterparties
                                        v-model="settings.CUSTOMER_ID"
                                        :rules="[$rules.required]"
                                        label="Название организации"
                                    >
                                    </select-counterparties>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="primary" @click="save">Сохранить</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card>
                        <v-form>
                            <h2 align="center">Учет заказов</h2>
                            <div class="container">
                                <div class="block">
                                    <div class="content">
                                        <v-img
                                            class="img"
                                            max-height="300"
                                            max-width="225"
                                            src="@/img/image.png"
                                        ></v-img>
                                        <div class="information">
                                            <div class="setting">
                                                <p>Версия:</p>
                                                <p>Версия БД:</p>
                                                <p>Разработал:</p>
                                            </div>
                                            <div class="setting">
                                                <p>1.0</p>
                                                <p>SQLite</p>
                                                <p>Мироненко Даниил Андреевич</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="description">
                                        <v-textarea
                                            no-resize
                                            readonly
                                            solo
                                            background-color="#DCDCDC"
                                            name="input-7-4"
                                            value="Программный продукт предназначается для применения предприятия ООО«СЭЗ»  для использования ограниченным кругом лиц, а именно: специалист - экспертами и лицами, отвечающими за введения отчетности."
                                        ></v-textarea>
                                    </div>
                                </div>
                            </div>
                        </v-form>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>

import api from "@/services/api";

export default {
    name: "Settings",
    data: () => ({
        settings: {},
        tabs: null,
        itemsTab: ["Настройки", "О программе"],
    }),
    created() {
        this.settings = api.settings.load();
    },
    methods: {
        save() {
            api.settings.save(this.settings);
        }
    }
}

</script>

<style scoped>
h2 {
    padding:20px 0 20px;
}
.content {
    display: flex;
}
.container {
    display: flex;
    justify-content: center;
}
.block {
    flex-direction: column;
    display: flex;
    justify-content: center;
}
.information {
    display: flex;
    line-height: 10px;
    justify-content: center;
}
.setting {
    line-height: 10px;
    padding-top: 25px;
}
p {
    margin-left: 20px;
}
.description {
    white-space: normal;
    margin-top: 30px;
}
</style>
