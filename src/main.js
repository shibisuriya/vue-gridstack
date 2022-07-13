import Vue from "vue";
import App from "./App.vue";
import './plugins/element.js'

Vue.config.productionTip = false;
export const eventBus = new Vue();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
