<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { setTitle } from "@/utils/mUtils.js";
export default {
  data() {
    return {
      loading: null,
      lockTime: 0,
      clearTime: null,
    };
  },

  created() {
    this.$router.beforeEach((to, from, next) => {
      //
      let title = "DBChain Control Panel";
      setTitle(title);
      next();
    });
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.$store.commit("setClientHeight", document.body.clientHeight);
        this.$store.commit("setClientWidth", document.body.clientWidth);
      })();
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.getIsLoding;
    },
  },
  watch: {
    async isLogin(val) {
      if (val) {
        this.lockTime = 15;
        try {
          this.clearTime.clearTimeout();
        } catch (error) {
        }
        this.clearTime = setTimeout(() => {
          this.$store.commit("setIsLoding", false);
        }, 5000);
        return (this.loading = this.$loading({
          lock: true,
          text: "",
          spinner: "xx",
          background: "rgba(0, 0, 0, 0)",
        }));
      }
      console.log(this.loading);
      this.lockTime = 0;
      try {
        this.clearTime.clearTimeout();
      } catch (error) {

      }
         return this.loading.close();
    },
  },
};
</script>
<style lang="scss" src="@/assets/scss/global.scss"></style>
<style lang="scss" src="@/assets/scss/checkElement.scss"></style>
