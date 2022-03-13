import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import router from "./router"

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");

import Database from "better-sqlite3";
let db = new Database("./db/chinook.db", { verbose: console.log });
console.log(db);
const row = db.prepare("SELECT * FROM genres").all();
console.log(row);
db.prepare("INSERT INTO tab (id) VALUES (?)").run([1]);
