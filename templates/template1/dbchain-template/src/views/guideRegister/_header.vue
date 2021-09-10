<template>
  <div class="_header">
    <div class="_check" v-if="isback && showBack">
      <span class="_icon" @click="Toback()">
        <icon-svg icon-class="icon-zhuceyefanhui" />
      </span>
    </div>
    <div class="_check _logo" v-if="islogo && showLogo">
      <icon-svg icon-class="icon-logozhuce" width="220" height="55"></icon-svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    back: Boolean,
    logo: Boolean,
  },
  data() {
    return {
      ToRouter: {
        "/login": "",
      },
      showBack: true,
      showLogo: true,
      showLogoRouter: [""],
    };
  },
  methods: {
    Toback() {
      if (this.$route.path.indexOf("register") !== -1) {
        let val = this.$store.getters.getRegisterisActive;
        if (val < 2) return this.$router.back();
        return this.$store.commit("setRegisterisActive", val - 1);
      }
      this.$router.back();
    },
    // 页面初始化时更新页面状态
    defaultHead() {
      if (this.$route.path == "/login") {
        this.showLogo = false;
        return (this.showBack = false);
      }
    },
  },
  created() {
    this.defaultHead();
  },
  computed: {
    isback: {
      get() {
        return this.back;
      },
      set(val) {
      },
    },
    islogo: {
      get() {
        return this.logo;
      },
      set(val) {
      },
    },
  },
  watch: {
    $route(to, from) {
      if (to.path == "/login") {
        this.isback = false;
        this.showLogo = false;
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
._header {
  display: flex;
  width: calc(100vw - 120px);

  justify-content: space-between;
  padding: 6.7vh;
  padding-bottom: 0;
  ._check {
    ._icon {
      font-size: 50px;
      cursor: pointer;
    }
    img {
      height: 46px;
    }
  }
  ._check._logo {
    height: 54px;
    display: flex;
  }
}
</style>
