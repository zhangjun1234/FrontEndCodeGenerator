<template>
  <!-- 输入密码直接登录页 其中引入导入助记词登录页 -->
  <div>
    <div class="_login" v-if="isactive == 0">
      <div class="_header">
        <div class="_img">
          <icon-svg
            icon-class="icon-logozhuce"
            iconViweBox="0 0 2 1"
          ></icon-svg>
        </div>
        <div class="_title">
          <span>欢迎您回来</span>
        </div>
      </div>
      <el-form
        :model="import_form"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        @submit.native.prevent
      >
        <div class="_content">
          <el-form-item
            label=""
            prop="_import_password"
            :rules="rules._import_password"
          >
            <div class="_flex">
              <span class="_icon">
                <icon-svg icon-class="icon-mima" />
              </span>

              <el-input
                placeholder="请输入密码"
                v-model.trim="import_form._import_password"
                @focus="$global.setActiveInput($event, 1)"
                @blur="$global.setActiveInput($event, 0)"
                show-password
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
              <span class="_absolute"></span>
            </div>
          </el-form-item>
          <div class="_footer">
            <div class="_login_btn" @click="submitForm('ruleForm')">
              进入控制台
            </div>
            <div class="_footer_flex">
              <span></span>
              <span class="_text" @click="$router.push('/lead/choice')"
                >忘记密码?</span
              >
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>

import {
  savePassphrase,
  hasKey,
  getMyName,
} from "dbchain-js-client";
import { setDefaultParams } from "@/custom/rest_client.js";

export default {
  data() {
    return {
      name: getMyName(),
      isactive: 0,
      import_form: {
        _import_password: "",
      },
      rules: {
        _import_password: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePsdReg,
            trigger: "change",
          },
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  created() {
    hasKey() ? "" : this.$router.push("/lead/default");
  },
  methods: {
    verifyInput() {
      let str = this.password.replace(/(^\s*)|(\s*$)/g, "");
      if (str.length < 8)
        return (this.rules[password] = {
          type: "error",
          text: "请输入8位以上密码",
        });
    },
    // 提交登录表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit("setIsLoding", true);
          if (savePassphrase(this.import_form._import_password)) {
            // 验证密码成功；
            this.$message.success("私钥密码正确");
            // 设置默认访问参数
            setDefaultParams();
            this.$router.push("/database/default");
            this.$store.commit("setIsLoding", false);
          } else {
            this.$message.warning("没有匹配的私钥密码，您重新输入");
            this.$store.commit("setIsLoding", false);
            return false;
          }
        } else {
          return false;
        }
      });
    },
    setIsActive(val) {
      if (!hasKey() && val == 0) {
        return this.$message.error("请先注册账号，若已有账号请导入助记词");
      }
      this.isactive = val;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
._login {
  ._header {
    text-align: left;
    padding-top: 20px;
    ._img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      font-size: 256px;
      height: 64px;
    }
    ._title {
      font-size: 26px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #000000;
      line-height: 39px;
      text-align: center;
      padding-bottom: 43px;
    }
  }
  ._content {
    ._title {
      text-align: left;
      font-size: 14px;
      font-family: SourceHanSansCN-Light, SourceHanSansCN;
      font-weight: 300;
      color: #2a2a2a;
      height: 40px;
      line-height: 40px;
      ._p {
        height: 14px;
        font-size: 14px;
        font-family: SourceHanSansCN-Light, SourceHanSansCN;
        font-weight: 300;
        color: #2a2a2a;
        line-height: 21px;
      }
    }
    ._flex {
      display: flex;
      align-items: center;
      position: relative;

      ._icon {
        left: 8px;
        position: absolute;
        z-index: 1;
        top: 12px;
        .svg-icon {
          font-size: 26px;
        }
      }
      ._absolute {
        height: 16px;
        font-size: 16px;
        font-family: SourceHanSansCN-Light, SourceHanSansCN;
        font-weight: 300;
        color: #cbcbcb;
        line-height: 24px;
        bottom: 16px;
        right: 32px;
        position: absolute;
      }
    }
    ._isfocus {
      border-bottom: 2px solid $active_color;
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
        margin-top: 165px;
        cursor: pointer;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      }
      ._footer_flex {
        display: flex;
        justify-content: space-between;
        ._text {
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #000000;
          cursor: pointer;
          &:first-child {
            text-align: left;
          }
        }
      }
      ._text {
        display: inline-block;
        padding: 14px 0 32px 0;
        width: 100%;
        text-align: right;
        font-size: 20px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #adadad;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
