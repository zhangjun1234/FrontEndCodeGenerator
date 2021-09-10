import xiaoyao from "@/assets/js/global.js";
import clipboard from "clipboard";
import rules from "@/assets/js/rules.js";
import ElementUI from "element-ui";

export default (Vue) => {
  // 防重复点击或提交
  Vue.directive("preventReClick", {
    inserted(el, binding) {
      el.addEventListener("click", () => {
        if (!el.disabled) {
          el.disabled = true;
          el.classList.add("_disabled");
          setTimeout(() => {
            el.disabled = false;
            el.classList.remove("_disabled");
          }, binding.value || 2000);
        }
      });
    },
  });
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive("focus", {
    // 当被绑定的元素插入到 DOM 中时 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
    inserted: function(el, binding) {
      // 聚焦元素、
      if (!binding.value) return el.querySelector("input").focus();
      if (binding.value !== binding.oldValue)
        return el.querySelector("input").focus();
    },
    update: function(el, binding) {
      if (!binding.value) return el.querySelector("input").focus();
      if (binding.value !== binding.oldValue)
        return el.querySelector("input").focus();
    },
  });

  let copyFn = (el, binding) => {
    let ClipboardJS = Vue.prototype.clipboard;
    var clipboard = new ClipboardJS(
      `.${el.classList[el.classList.length - 1]}`,
      {
        text: function(trigger) {
          return binding.value;
        },
      }
    );
    clipboard.on("success", function(e) {
      Vue.prototype.$message.closeAll();
      Vue.prototype.$message({ type: "success", message: "复制成功" });
      // clipboard.destroy();
    });

    clipboard.on("error", function(e) {
      Vue.prototype.$message({
        type: "warning",
        message: `[${binding.value}] 不支持自动复制，请手动复制 `,
      });
    });
  };
  // 全局复制内容指令
  Vue.directive("copy", {
    bind(el, binding) {
      let className = `_copy_${new Date().getTime()}`;
      el.classList.add(className);
      el.addEventListener("click", copyFn(el, binding));
    },
    inserted(el, binding) {
      el.addEventListener("click", copyFn(el, binding));
    },
    update(el, binding) {
      el.addEventListener("click", copyFn(el, binding));
    },
    componentUpdated(el, binding) {
      el.addEventListener("click", copyFn(el, binding));
    },
    unbind(el, binding) {
      el.removeEventListener("click", copyFn(el, binding));
    },
  });
  //异常处理
  Vue.config.errorHandler = function(err, vm, info) {
    console.log(`Error: ${err.toString()}\nInfo: ${info}`);
  };
  //注册到vue原型上
Vue.prototype.$global = xiaoyao;
Vue.prototype.clipboard = clipboard;
Vue.prototype.$rules = rules;
Vue.use(ElementUI);

};
