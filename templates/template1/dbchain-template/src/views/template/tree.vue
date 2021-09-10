<template>
  <div class="tree">
    <div class="tree-header">
      <div class="shrink-icon">
        <a-icon
          v-show="unfold"
          @click="handleShrik(false)"
          type="minus-circle"
        />
        <a-icon
          v-show="!unfold"
          @click="handleShrik(true)"
          type="plus-square"
        />
      </div>
      <div class="data-base-name">
        <span>~~</span>
        <a-icon type="database" />
        <span> {[.appCode]}</span>
      </div>
    </div>
    <div class="table-list" v-show="unfold">
      {[range .table]}
      <div
        class="table"
        :class="currentTable == '{[.name]}' ? 'highlight table' : 'table'"
        @click="handleTableClick('{[.name]}')"
      >
        <a-icon type="table" />
        <span>-{[.name]}</span>
      </div>
      {[end]}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unfold: true,
    };
  },
  props: {
    currentTable: String,
  },
  methods: {
    handleShrik(bol) {
      this.unfold = bol;
    },
    handleTableClick(value) {
      this.$emit("clickUser", value);
    },
  },
};
</script>
<style lang="css" scoped>
.tree {
  margin-left: 20px;
  width: 150px;
  border-radius: 10px;
  padding-top: 10px;
}

.tree .tree-header {
  display: flex;
}
.tree-header:hover {
  background: #eee;
}
.shrink-icon {
  cursor: pointer;
}
.table-list {
  margin-left: 33px;
  margin-top: 5px;
  transition: height 2s;
}

.table {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  border-radius: 6px;
  padding-left: 10px;
}

.highlight {
  background: #04a669 !important;
  color: #fff;
}
.table:hover {
  background: #eee;
}
</style>

