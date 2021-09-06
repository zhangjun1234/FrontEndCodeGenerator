<template>
  <a-modal
    title="添加数据"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="() => handleBtnClick('ok')"
    cancelText="取消"
    okText="提交数据"
    :closable="false"
    width="800px"
    @cancel="() => handleBtnClick('cancel')"
  >
    <a-table
      :columns="columns"
      :row-key="(item) => item.id"
      :data-source="dataSource"
      :pagination="false"
    >
      <a-input
        slot="action"
        slot-scope="row"
        type="text"
        @change="(e) => hanldeInput(e, row.fild)"
      />
    </a-table>
  </a-modal>
</template>

<script>
import * as dbchain from "dbchain-js-client";
const columns = [
  {
    dataIndex: "id",
    key: "id",
    title: "#",
  },
  {
    dataIndex: "fild",
    key: "fild",
    title: "字段",
  },
  {
    title: "属性",
    dataIndex: "attribute",
    key: "attribute",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
let nextId = 1;
export default {
  props: {
    visible: Boolean,
    fileds: Array,
    dabseName: String,
    tableName: String,
  },
  data() {
    return {
      confirmLoading: false,
      dataSource: [],
      columns,
      addDataObj: {},
    };
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        const filterFileds = this.fileds.filter(
          (item) =>
            !["id", "created_at", "created_by", "tx_hash"].includes(item)
        );
        this.dataSource = [];
        nextId = 1;
        this.initData(filterFileds);
      }
    },
  },
  methods: {
    async handleBtnClick(mode) {
      if (mode === "cancel") return this.$emit("update:visible", false);
      const vm = this;
      this.confirmLoading = true;
      const canInsrtRowResult = await dbchain.canInsertRow(
        this.dabseName,
        this.tableName,
        this.addDataObj
      );
      if (!canInsrtRowResult) {
        vm.confirmLoading = false;
        return vm.$message.error(
          "您插入的数据与现有表结构冲突，请检查属性与数据后重试"
        );
      }
      dbchain.insertRow(this.dabseName, this.tableName, this.addDataObj, () => {
        if (canInsrtRowResult) {
          vm.$message.success("插入成功");
          vm.$emit("update:visible", false);
          vm.$emit("insetStatus", true);
          vm.confirmLoading = false;
        } else {
          vm.$message.error("插入失败");
          vm.$emit("insetStatus", false);
          vm.confirmLoading = false;
        }
      });
    },
    hanldeInput(e, fild) {
      const value = e.target.value;
      this.addDataObj[fild] = value;
    },
    async initData(fileds) {
      for (let key of fileds) {
        let obj = {};
        const result = await dbchain.getFieldOptions(
          this.dabseName,
          this.tableName,
          key
        );
        obj.attribute = result.join(",");
        obj.fild = key;
        const fileResult = await dbchain.getFieldType(
          this.dabseName,
          this.tableName,
          key
        );
        obj.id = nextId++;
        obj.type = fileResult;
        obj.value = "";
        this.dataSource.push(obj);
      }
    },
  },
};
</script>
<style scoped></style>
