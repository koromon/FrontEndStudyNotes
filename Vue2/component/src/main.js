import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Alert from "@/components/alert/alert";
import { optionalChaining } from "./utils/assist";

Vue.config.productionTip = false;
Vue.prototype.$Alert = Alert;
Vue.prototype.$$ = optionalChaining;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
