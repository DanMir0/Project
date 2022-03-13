import Vue from "vue";
import VueRouter from "vue-router";
import Products from "@/views/Products";
import Counterparties from "@/views/Сounterparties";
import Dashboard from "@/views/Dashboard";
import Documents from "@/views/Documents";
import Productions from "@/views/ProductionOrders";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Dashboard },
  { path: "/products", component: Products },
  { path: "/counterparties", component: Counterparties },
  { path: "/documents", component: Documents },
  { path: "/productions", component: Productions },
];

const router = new VueRouter({
  routes,
});

export default router;
