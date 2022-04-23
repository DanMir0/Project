<template>
    <div class="settings">
        <v-card>
            <v-form>
                <v-card-title>
                    <span class="text-h5">Настройки</span>
                </v-card-title>

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
    </div>
</template>

<script>

import api from "@/services/api";

export default {
    name: "Settings",
    data: () => ({
        settings: {},
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
