import Vue from "vue";
import VueRouter from "vue-router";
import Products from "@/views/Products";
import Counterparties from "@/views/Сounterparties";
import Dashboard from "@/views/Dashboard";

Vue.use(VueRouter);

const routes = [
  { path: "/products", component: Products },
  { path: "/counterparties", component: Counterparties },
  { path: "/", component: Dashboard },
];

const router = new VueRouter({
  routes,
});

export default router;
