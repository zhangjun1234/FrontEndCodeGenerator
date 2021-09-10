<template>
  <div class="_lead">
    <div class="_content _hideScrollbar">
      <router-view></router-view>
    </div>
    <div
      class="_footer"
      :class="$route.path == '/lead/choice' ? '_back_color' : ''"
    >
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import footer from "./_footer";

export default {
  components: {
    Footer: footer,
  },

  mounted() {
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
._lead {
  ._content {
    height: 95vh;
    overflow-y: auto;
  }
  ._back_color {
    background: #f5f5f5;
  }
}
</style>
