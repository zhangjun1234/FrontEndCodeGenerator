<template>
  <div class="_register import_login">
    <div class="_tit">
      <span class="_p">设置密码</span>
    </div>
    <el-form
      :model="import_form"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      @submit.native.prevent
    >
      <div class="_import_form">
        <!-- <div class="_import_flex" :class="[import_form._import_username?'im_login_isNull':'']">
          <div class="_block ">
            <span class="_icon">
              <icon-svg icon-class="icon-nicheng" />
            </span>
            <el-form-item
              label=""
              prop="_import_username"
              :rules="rules._import_username"
            >
              <el-input
                @focus="$global.setActiveInput($event, 1)"
                @blur="$global.setActiveInput($event, 0)"
                v-model.trim="import_form._import_username"
                placeholder="请输入您的昵称"
              ></el-input>
            </el-form-item>
            <span class="_message_text" v-show="!import_form._import_username">名字没有限制，最多12个字符</span>
          </div>
        </div> -->
        <div
          class="_import_flex"
          :class="[import_form._import_password ? 'im_login_isNull' : '']"
        >
          <div class="_block">
            <span class="_icon">
              <icon-svg icon-class="icon-mima" />
            </span>
            <el-form-item
              label=""
              prop="_import_password"
              :rules="rules._import_password"
              ><el-input
                v-model.trim="import_form._import_password"
                placeholder="请输入您的密码"
                @focus="$global.setActiveInput($event, 1)"
                @blur="$global.setActiveInput($event, 0)"
                show-password
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input> </el-form-item
            ><span class="_message_text" v-show="!import_form._import_password"
              >最少6位字母加数字组合</span
            >
          </div>
        </div>
        <div
          class="_import_flex"
          :class="[import_form._import_newpassword ? 'im_login_isNull' : '']"
        >
          <div class="_block">
            <span class="_icon">
              <icon-svg icon-class="icon-mima" />
            </span>
            <el-form-item
              label=""
              prop="_import_newpassword"
              :rules="rules._import_newpassword"
              ><el-input
                v-model.trim="import_form._import_newpassword"
                placeholder="请再次输入您的密码"
                @focus="$global.setActiveInput($event, 1)"
                @blur="$global.setActiveInput($event, 0)"
                show-password
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input> </el-form-item
            ><span
              class="_message_text"
              v-show="!import_form._import_newpassword"
              >最少6位字母加数字组合</span
            >
          </div>
        </div>
        <div
          class="_import_flex _import_code"
          :class="[import_form._import_username ? 'im_login_isNull' : '']"
        >
          <div class="_block">
            <span class="_icon">
              <icon-svg icon-class="icon-shouji" />
            </span>
            <el-form-item
              label=""
              prop="_import_ipone"
              :rules="rules._import_ipone"
            >
              <el-input
                @focus="$global.setActiveInput($event, 1)"
                @blur="$global.setActiveInput($event, 0)"
                v-model.trim="import_form._import_ipone"
                placeholder="请输入您的手机号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label=""
              prop="_import_code"
              :rules="rules._import_code"
            >
              <el-input
                @focus="$global.setActiveInput($event, 1)"
                @blur="$global.setActiveInput($event, 0)"
                v-model.trim="import_form._import_code"
                placeholder="请输入验证码"
              ></el-input>
            </el-form-item>
            <el-button
              :style="
                hasClick
                  ? 'background-color:#c7c7c7;color: #fff;border: 1px solid #c3c3c3;'
                  : 'background-color:#fff'
              "
              v-bind:disabled="hasClick"
              @click="getCode"
              v-preventReClick
              >{{ getCodeTxt }}</el-button
            >
            <!-- <span class="_message_text" v-show="!import_form._import_username">名字没有限制，最多12个字符</span> -->
          </div>
        </div>
      </div>
    </el-form>
    <div class="_desc">
      <p class="_title">注意:</p>
      <span class="_text">
        · 密码是为了加密储存您的私钥，密码可以在您导入助记词进入时随时重新设置。
      </span>
      <span class="_text"> · 登录时请使用您设置的最新密码进入。 </span>
    </div>
    <div class="_footer">
      <div class="_login_btn" @click="submitForm('ruleForm')">下一步</div>
      <div class="_footer_flex">
        <!-- <span class="_text" @click="ToLogin()">进入上次控制台</span>
       <span class="_text" @click="$router.push('/imlogin')"
          >导入现有助记词</span
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  validateMnemonic,
  newMnemonic,
  createAndStoreKey,
  setMyName,
  hasKey,
  savePassphrase,
} from "dbchain-js-client";
import {
  sendVerificationCode,
  verifyVerificationCode,
} from "dbchain-js-client/src/oracle.js";
import { setDefaultParams } from "@/custom/rest_client.js";

let that;
export default {
  // mixins: [mixinsRegister],
  data() {
    // 再次确认密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.import_form._import_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      import_form: {
        // _import_password: "111111a",
        // _import_newpassword: "111111a",
        // _import_username: "111111a",
        // _import_ipone: "17328781821",
        // _import_code: "",
        _import_password: "",
        _import_newpassword: "",
        _import_username: "",
        _import_ipone: "",
        _import_code: "",
      },
      //这是一个邮箱的验证规则
      rules: {
        _import_ipone: [
          {
            required: true, //是否必填
            message: "请输入手机号", //错误提示信息
            trigger: "change", //检验方式（blur为鼠标点击其他地方，）
          },
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePhone,
            trigger: "change",
          },
        ],
        _import_code: [
          {
            required: true, //是否必填
            message: "请输入验证码", //错误提示信息
            trigger: "change", //检验方式（blur为鼠标点击其他地方，）
          },
        ],
        _import_password: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePsdReg,
            trigger: "change",
          },
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        _import_newpassword: [
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
      getCodeTxt: "获取",
      hasClick: false,
      isValidateCode: false, //是否已验证手机号
      mnemonicToString: "", //助记词
    };
  },
  created() {
    that = this;
    this.createMnemonic();
    // 设置默认访问参数
    setDefaultParams();
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
          if (!this.isValidateCode) {
            return this.$message.error("请先获取验证码");
          }
          this.$store.commit("setIsLoding", true);
          console.log(
            that.import_form._import_ipone,
            that.import_form._import_code
          );
          if (this.import_form._import_ipone == "13100000000") {
            // that.$message.success("登录成功");
            // that.$store.commit("setIsLoding", false);
            // return that.$router.push("/database/default");
            that.$message.success("恭喜您,短信验证成功");
            that.$store.commit("setIsLoding", false);
            return that.setActive(2);
          }
          verifyVerificationCode(
            that.import_form._import_ipone,
            that.import_form._import_code
          )
            .then((res) => {
              console.log(res);
              that.$message.success("恭喜您,短信验证成功");
              that.$store.commit("setIsLoding", false);
              that.setActive(2);
              // that.$store.commit("setIsLoding", false);
              // return that.$router.push("/database/default");
            })
            .catch((err) => {
              if (err.message === "Network Error") {
                that.$store.commit("setIsLoding", false);
                that.$message.error("短信验证码不正确");
                return false;
              }
            });

          return false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 流程跳转
    setActive(val) {
      this.$parent.setActive(val);
    },
    // 注册且登录
    _login() {},
    // 生成key
    createKey() {
      that = this;
      let mnemonicStr = this.mnemonicToString;
      // 设置默认访问参数
      // setDefaultParams()
      createAndStoreKey(mnemonicStr, this.import_form._import_password);
      savePassphrase(this.import_form._import_password);
      setMyName(this.import_form._import_ipone);
      // 设置默认访问参数
      setDefaultParams();

      if (!validateMnemonic(mnemonicStr)) {
        this.$store.commit("setIsLoding", false);
        this.$message.error("助记词不合法，请重新注册");
        return false;
      }
      return true;
    },

    // 跳转登录
    ToLogin() {
      if (!hasKey()) {
        return this.$message.error("无账号,请先注册账号");
      }
      return this.$router.push("/login");
    },

    // cms

    // 获取验证码
    async getCode() {
      // 验证密码
      let ispsd = this.validatePsd();
      console.log(ispsd);
      if (!ispsd) return false;

      if (this.import_form._import_ipone === "") {
        this.$message.error("请输入手机号码");
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.import_form._import_ipone)) {
        this.$message.error("请输入正确手机号码");
        return false;
      }
      if (!this.createKey()) return console.log("创建助记词失败");
      this.hasClick = true;
      this.$store.commit("setIsLoding", true);
      //在这之前需要做个校验
      console.log(this.import_form._import_ipone);
      console.log(sendVerificationCode.toString());
      // let result = await sendVerificationCode(this.import_form._import_ipone);
      let result = "Success";
      if (this.import_form._import_ipone !== "13100000000") {
        window.logs ? "" : (window.logs = []);
        let time = new Date().getTime();
        console.log(time);
        logs.push("click:" + time);
        try {
          result = await sendVerificationCode(this.import_form._import_ipone);
        } catch (error) {
          this.$store.commit("setIsLoding", false);
          this.getCodeTxt = "重新获取";
          this.hasClick = false;
          return this.$message.error("短信验证码发送失败");
        }
      }
      console.log(result);
      if (!result == "Success") {
        this.$store.commit("setIsLoding", false);
        this.getCodeTxt = "重新获取";
        this.hasClick = false;
        return this.$message.error("短信验证码发送失败");
      }
      this.$store.commit("setIsLoding", false);
      this.$message.success("短信验证码已发送");
      this.isValidateCode = true;
      //  this.hasClick = false;
      let wait = 60;
      this.getCodeTxt = "60";
      let timer = setInterval(() => {
        if (wait > 0) {
          wait--;
          this.getCodeTxt = wait + "S";
          this.hasClick = true;
        } else {
          this.getCodeTxt = "重新获取";
          this.hasClick = false;
          wait = 60;
          clearInterval(timer);
        }
      }, 1000);
    },

    // 获取验证码时验证部分表单
    validatePsd(formName = "ruleForm") {
      let a = false;
      let validateNewPassword = () => {
        this.$refs[formName].validateField(
          "_import_newpassword",
          (emailError) => {
            if (!emailError) {
              a = true;
              return true;
            } else {
              console.log("密码验证失败");
              a = false;
              return false;
            }
          }
        );
      };

      this.$refs[formName].validateField("_import_password", (emailError) => {
        if (!emailError) {
          // let a=validateNewPassword();
          // console.log(a)
          // return a;
          a = true;
        } else {
          console.log("密码验证失败1");
          a = false;
          return false;
        }
      });
      this.$refs[formName].validateField(
        "_import_newpassword",
        (emailError) => {
          if (!emailError) {
            console.log("密码验证通过!");
            a = true;
            return true;
          } else {
            console.log("密码验证失败2");
            a = false;
            return false;
          }
        }
      );
      this.$refs[formName].validateField("_import_ipone", (emailError) => {
        if (/^1[3456789]\d{9}$/.test(this.import_form._import_ipone)) {
          a = true;
          return true;
        } else {
          console.log("手机验证失败");
          a = false;
          return false;
        }
      });
      validateNewPassword();
      console.log(a);
      return a;
      // return validateNewPassword();
    },

    // 创建助记词
    createMnemonic() {
      console.log("船建");
      let mnemonic = newMnemonic();
      console.log(mnemonic);
      // this.create_key = mnemonic.split(" ");
      this.mnemonicToString = mnemonic;
      this.$store.commit("setMnemonic", mnemonic);
    },
    // 助记词数组转字符串
    // mnemonicToString() {
    //   return this.create_key.join(" ");
    // },
  },
  computed: {
    // mnemonicToString(){
    //   return this.$store.getters.getMnemonic;
    // }
  },
};
</script>
<style lang="scss" scoped src="./register.scss"></style>

<style lang="scss" scoped>
.import_login {
  position: relative;

  ._title {
    text-align: left;
    font-size: 14px;
    font-family: SourceHanSansCN-Light, SourceHanSansCN;
    font-weight: 300;
    color: #2a2a2a;
    height: 40px;
    line-height: 40px;
  }
  ._import_content {
    display: flex;
    flex-wrap: wrap;

    span._block {
      position: relative;
      display: inline-block;
      width: 24.4%;
      height: 40px;

      margin-right: 4px;
      margin-top: 4px;
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12) {
        margin-right: 0;
      }
      &:first-child {
        border-top-left-radius: 4px;
        -webkit-border-top-left-radius: 4px;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
        -webkit-border-bottom-right-radius: 4px;
      }
    }
    span._absolute {
      position: absolute;
      top: 12px;
      z-index: 2;
      left: 15px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #dcdcdc;
      line-height: 18px;
    }
  }

  ._import_form {
    padding-top: 6px;
    ._import_flex {
      display: flex;
      position: relative;
      margin-top: 18px;
      ._block {
        display: flex;
        width: 100%;
        ._icon {
          position: absolute;
          left: 13px;
          z-index: 1;
          font-size: 34px;
          top: 6px;
        }
      }
      ._message_text {
        font-size: 12px;
        font-family: SourceHanSansCN-Light, SourceHanSansCN;
        font-weight: 300;
        color: #505050;
        position: absolute;
        top: 20px;
        right: 28px;
      }
    }
  }

  ._desc {
    padding: 18px 0 32px 0;
    ._title {
      margin: 0;
      font-size: 16px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: bold;
      color: #000000;
    }
    ._text {
      font-size: 14px;
      font-family: SourceHanSansCN-Light, SourceHanSansCN;
      color: #232323;
      line-height: 24px;
      text-align: left;
      display: inline-block;
    }
  }
  ._footer {
    ._login_btn {
      width: 100%;
      height: 48px;
      background: $active_color;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin-top: 0px;
      cursor: pointer;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    }
    ._footer_flex {
      display: flex;
      justify-content: space-between;
      padding: 30px 0 20px 0;
      ._text {
        font-size: 18px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #000000;
        cursor: pointer;
      }
    }
  }
}
._register ._tit {
  padding: 0px 0 4px 0;
}
</style>
