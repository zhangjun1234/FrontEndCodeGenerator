<template>
  <!-- 登录注册父组件，处理要跳转的分类 -->
  <div class="_loginReg">
    <div class="_CHECK_CONT _hideScrollbar">
      <div class="_header">
        <backHeader :back="true" :logo="true" />
      </div>
      <div class="_content" :class="[isImLogin ? 'isImLogins' : '']">
        <el-card class="box-card" :style="'top:'">
          <div class="_view">
            <router-view></router-view>
          </div>
        </el-card>
      </div>
    </div>

    <div class="_foot">
      <Footer />
    </div>
  </div>
</template>
<script>
import backHeader from "@/views/guideRegister/_header.vue";
import Foot from "@/views/guideRegister/_footer.vue";
import { viewportToPixels } from "@/utils/mUtils";

import {  bodyResize } from "@/utils/mUtils.js";
export default {
  data() {
    return {
      activeTab: 0,
      isImLogin: false,
    };
  },
  components: {
    backHeader,
    Footer: Foot,
    // login,
    // register,
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    gettop(h = 666) {
      let height = viewportToPixels("100vh");
      console.log();
    },
  },
  created() {
    if (this.$route.path == "/imlogin" && document.body.clientHeight < 820) {
      this.isImLogin = true;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/imlogin" && document.body.clientHeight < 820) {
        return (this.isImLogin = true);
      }

      this.isImLogin = false;
    },
  },
  mounted() {
    bodyResize();
    // bodyScale('#app',1)
  },
  destroyed() {
    // bodyScale('#app',1)
  },
};
</script>
<style lang="scss" scoped>
._loginReg {
  position: relative;
  height: 100vh;
  background: #f1f1f1;
  ._CHECK_CONT {
    height: 95vh;
    overflow-y: auto;
  }
  ._header {
    display: flex;
    // padding: 35px 268px 20px 91px;
    justify-content: space-between;
    position: absolute;
    // width: calc(100% - 120px);
    ._left {
      img {
        width: 117px;
        height: 37px;
      }
    }
    ._right {
      img {
        width: 258px;
        height: 54px;
      }
    }
  }
  ._content {
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4%;
    .box-card {
      width: 632px;
      max-height: 666px;
      min-width: 632px;
      overflow: initial !important;
      height: min-content;
      ._tab {
        display: flex;
        width: 202px;
        justify-content: space-between;
        padding: 26px 0 59px 0;
        margin: 0 auto;
        div {
          width: 46px;
          height: 22px;
          font-size: 22px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;

          font-weight: 300;
          color: #ababab;
          line-height: 22px;
          letter-spacing: 1px;

          cursor: pointer;
          ._btm_border {
            width: 19px;
            height: 5px;
            background: $active_color;
            display: inline-block;
          }
        }
        .isactiveTab {
          color: #000000;
          font-weight: 500;
        }
      }
    }
  }
  .isImLogin {
    align-items: unset;
    padding-top: 138px;
  }
}
</style>
