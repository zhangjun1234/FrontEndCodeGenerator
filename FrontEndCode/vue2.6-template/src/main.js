import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
import "ant-design-vue/dist/antd.css";
import  * as ant from "ant-design-vue";
import { options } from "../templateOptions";

localStorage.setItem("dbchainwallet", options.dbchainwallet);
localStorage.setItem("dbchain_base_url", options.dbchain_base_url);
localStorage.setItem("profile:name", options.profileName);
sessionStorage.setItem("passphrase", options.passphrase);

Vue.component(ant.Button.name, ant.Button);
Vue.component(ant.Card.name, ant.Card);
Vue.component(ant.Table.name, ant.Table);
Vue.component(ant.Modal.name, ant.Modal);
Vue.component(ant.Input.name, ant.Input);
Vue.component(ant.Tree.name, ant.Tree);
Vue.component(ant.Row.name, ant.Row);
Vue.component(ant.Col.name, ant.Col);
Vue.component(ant.Icon.name, ant.Icon);
Vue.prototype.$message = ant.message;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
