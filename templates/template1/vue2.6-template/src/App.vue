<template>
  <div id="app">
    <!-- <Template /> -->
    <!-- <TestVue/> -->
    <GoTemplateVue />
  </div>
</template>

<script>
import Template from "./view/template.vue";
import TestVue from "./template/tree.vue";
import TableStructureVue from "./template/tableStructure.vue";
import GoTemplateVue from "./view/GoTemplate.vue";
export default {
  name: "App",
  components: {
    TestVue,
    TableStructureVue,
    GoTemplateVue,
  },
};
</script>

<style></style>
