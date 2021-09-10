import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "element-ui/lib/theme-chalk/index.css";
import "@/components/iconSvg"; // iconSvg
import vueDirective from "@/utils/vueDirective";
// 使用表单规则验证
vueDirective(Vue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
