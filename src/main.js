import "@/styles/main.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@fontsource/roboto";
import vuetify from "./plugins/vuetify";
import dialog from "./plugins/dialog";
import rules from "./plugins/rules";
import VueMask from "v-mask";
import PrintDialog from "@/components/PrintDialog";
import SelectCounterparties from "@/components/SelectCounterparties";

Vue.use(dialog);
Vue.use(rules);
Vue.use(VueMask);
Vue.component('PrintDialog', PrintDialog)
Vue.component('SelectCounterparties', SelectCounterparties)

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
