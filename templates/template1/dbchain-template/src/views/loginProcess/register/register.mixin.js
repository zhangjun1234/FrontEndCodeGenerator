import {
  newMnemonic,
  createAndStoreKey,
  setMyName,
  savePassphrase,
} from "dbchain-js-client";
export const mixinsRegister = {
  components: {
    // importRegister
  },
  data() {
    // 再次确认密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      create_key: [
        "violin",
        "hollow",
        "naive",
        "funny",
        "goddess",
        "surface",
        "monster",
        "ask",
        "inch",
        "shuffle",
        "cost",
        "stem",
      ],
      ruleForm: {
        password: "",
        username: "",
        new_password: "",
      },

      //这是一个邮箱的验证规则
      rules: {
        username: [
          {
            required: true, //是否必填
            message: "请输入昵称", //错误提示信息
            trigger: "blur", //检验方式（blur为鼠标点击其他地方，）
          },
          // {
          //   required: true,
          //   validator: this.$rules.FormValidate.Form().validateUsername,
          //   trigger: "change"
          // }
        ],
        password: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePsdReg,
            trigger: "change",
          },
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        new_password: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePsdReg,
            trigger: "change",
          },
          { required: true, validator: validatePass, trigger: "change" },
        ],
      },
      rulesText: {
        username: {
          type: "info",
          text: "昵称请输入2-10位非中文字符",
          rule: /^\S{0,10}$/,
        },
        password: {
          type: "info",
          text: "最少6位字母加数字组合",
          rule: /^\S{8,16}$/,
        },
        new_password: {
          type: "info",
          text: "最少6位字母加数字组合",
          rule: /^\S{8,16}$/,
        },
      },
    };
  },
  created() {
    this.createMnemonic();
  },

  methods: {
    custom(context) {
      console.log(context.value);
      if (context.value === "yes") {
        return {
          on: ["input"],
        };
      }

      return { on: ["change"] };
    },
    submitForm(formName) {
      console.log(this);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit("setIsLoding", true);
          console.log(valid);
          let mnemonicStr = this.mnemonicToString();
          console.log(mnemonicStr);
          createAndStoreKey(mnemonicStr, this.ruleForm.password);
          console.log(this.ruleForm.username);
          if (this.ruleForm.username) {
            savePassphrase(this.ruleForm.password);
            setMyName(this.ruleForm.username);
            // 设置默认访问参数
            setDefaultParams();
            this.$router.push("/database/default");
          }
          this.$store.commit("setIsLoding", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 创建助记词
    createMnemonic() {
      let mnemonic = newMnemonic();
      console.log();
      this.create_key = mnemonic.split(" ");
    },
    // 助记词数组转字符串
    mnemonicToString() {
      return this.create_key.join(" ");
    },
    // 注册且登录
    _login() {},
    createKey: function () {
      if (this.$refs.form.validate()) {
        var pp1 = this.passphrase1;
        var pp2 = this.passphrase2;
        if (pp1 == pp2) {
          createAndStoreKey(this.resultMnemonic, pp1);
          if (this.name) {
            setMyName(this.name);
          }
          this.$router.push({ name: "Account" });
        } else {
          this.passphrase1 = "";
          this.passphrase2 = "";
        }
      }
    },
  },
};
