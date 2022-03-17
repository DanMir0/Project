import Vue from "vue";
import VueRouter from "vue-router";
import Products from "@/views/Products";
import Product from "@/views/Product";
import Counterparties from "@/views/Counterparties";
import Counterparty from "@/views/Counterparty";
import Dashboard from "@/views/Dashboard";
import Documents from "@/views/Documents";
import DocumentTypes from "@/views/DocumentTypes";
import Productions from "@/views/ProductionOrders";
import TechCards from "@/views/TechCards";
import TechCard from "@/views/TechCard";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Dashboard },
  { path: "/products", component: Products },
  { path: "/products/:id", component: Product, props: true },
  { path: "/counterparties", component: Counterparties },
  { path: "/counterparties/:id", component: Counterparty, props: true },
  { path: "/documents", component: Documents },
  { path: "/productions", component: Productions },
  { path: "/tech_cards", component: TechCards },
  { path: "/tech_cards/:id", component: TechCard },
  { path: "/document_types", component: DocumentTypes },
];

const router = new VueRouter({
  routes,
});

export default router;
