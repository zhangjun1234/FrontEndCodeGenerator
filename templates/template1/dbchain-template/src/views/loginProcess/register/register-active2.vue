<template>
  <div>
    <div class="_tit">
      <span class="_p">创建助记词</span>
      <div class="_check">
        <span style="opacity: 0" class="_icon" v-copy="mnemonicToString">
          <icon-svg icon-class="icon-fuzhiicon" />
        </span>
        <!-- <span class="_refresh" @click="createMnemonic">
          <icon-svg icon-class="icon-shuaxin" />
        </span> -->
      </div>
    </div>
    <div class="_content _bg" v-if="!isShowMne" @click="ShowMne()">
      <span class="_icon_click">
        <icon-svg icon-class="icon-dianji" />
      </span>
      <p>点击此处显示助记词</p>
    </div>
    <div class="_content" v-else>
      <span class="_block" v-for="(item, index) in create_key" :key="index">
        <span class="_absolute">{{ index + 1 }}</span>
        <span class="_text _one_omit">{{ item }}</span>
      </span>
    </div>

    <div class="_desc">
      <p class="_title">注意</p>
      <span class="_text">
        · 助记词是您身份的唯一证明，可以帮助您轻松备份和恢复账号；
      </span>
      <span class="_text"> · 系统不会帮您保存助记词，丢失后无法找回； </span>
      <span class="_text">
        · 请将该助记词记录在纸上，并保存在安全的地方。如果希望提升信息的安全
        性，请将信息 记录在多张纸上并分别保存在2-3个不同的地方。
      </span>
      <p class="_title">
        警告：切勿向他人透露您的助记词。任何人一旦持有您的助记词就能进入您的账号。
      </p>
    </div>
    <div class="_footer">
      <el-button
        class="_login_btn"
        :style="
          hasClick
            ? 'background-color:#c7c7c7;color: #fff;border: 1px solid #c3c3c3;cursor: no-drop;'
            : ''
        "
        v-bind:disabled="hasClick"
        @click="setActive(3)"
        >{{ getCodeTxt }}</el-button
      >
      <!-- <div class="_login_btn" @click="setActive(2)">验证助记词</div> -->
      <!-- <div class="_login_btn" @click="submitForm('ruleForm')">
        验证助记词
      </div> -->
      <div class="_footer_flex">
        <!-- <span class="_text" @click="ToLogin()"></span> -->
        <!-- <span class="_text" @click="$router.push('/imlogin')"
          >导入现有助记词</span
        > -->
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      hasClick: true,
      getCodeTxt: "下一步",
      isShowMne: false,
    };
  },
  created() {
    // this.getText()
  },
  methods: {
    setActive(val) {
      this.$parent.setActive(val);
    },

    // 跳转登录
    ToLogin() {
      if (!hasKey()) {
        return this.$message.error("无账号,请先注册账号");
      }
      return this.$router.push("/login");
    },
    getText() {
      let wait = 6;
      this.getCodeTxt = "6s";
      let timer = setInterval(() => {
        if (wait > 0) {
          wait--;
          this.getCodeTxt = wait + "S";
          this.hasClick = true;
        } else {
          this.getCodeTxt = "验证助记词";
          this.hasClick = false;
          wait = 6;
          clearInterval(timer);
        }
      }, 1000);
    },
    // 显示助记词
    ShowMne() {
      this.isShowMne = true;
      this.getText();
    },
  },
  computed: {
    mnemonicToString() {
      return this.$store.getters.getMnemonic;
    },
    create_key() {
      return this.$store.getters.getMnemonic.split(" ");
    },
  },
};
</script>

<style lang="scss" scoped src="./register.scss"></style>
<style lang="scss" scoped>
._content {
}
._bg._content {
  background: #393939;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  padding: 31px 0 20px;
  cursor: pointer;
  ._icon_click {
    font-size: 28px;
  }
  p {
    font-size: 18px;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;
    line-height: 27px;
  }
}
</style>
