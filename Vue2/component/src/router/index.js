import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Display from "../views/display.vue";
import TableRender from "../views/table-render.vue";
import TableSlot from "../views/table-slot.vue";
import Tree from "../views/tree.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/display",
    name: "Display",
    component: Display,
  },
  {
    path: "/table",
    name: "Table",
    component: TableRender,
  },
  {
    path: "/table-slot",
    name: "TableSlot",
    component: TableSlot,
  },
  {
    path: "/tree",
    name: "Tree",
    component: Tree,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
