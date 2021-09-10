<template>
  <!-- 注册页 -->
  <div class="_register">
    <div class="_tit_img">
    </div>
    <div class="isactive1" v-show="isactive == 1">
      <register_active1 />
    </div>
    <div class="isactive2" v-show="isactive == 2">
      <register_active2 />
    </div>
    <div class="isactive3" v-show="isactive == 3">
      <register_active3 />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import register_active1 from "./register-active1";
import register_active2 from "./register-active2";
import register_active3 from "./register-active3";
export default {
  data() {
    return {
      isactive: 1,
    };
  },
  components: {
    register_active1,
    register_active2,
    register_active3,
  },
  computed: {
    ...mapState(["registerisActive"]),
  },
  methods: {
    setActive(val) {
      this.isactive = val;
      this.$store.commit("setRegisterisActive", val);
    },
  },
  watch: {
    registerisActive(val) {
      this.isactive = val;
    },
  },
};
</script>
<style lang="scss" scoped>
._register {
  position: relative;
  ._tit_img {
    display: flex;
    position: absolute;
    left: 30%;
    top: -114px;
    z-index: 2;
    ._img {
      img {
        height: 54px;
      }
    }
  }
}
</style>
