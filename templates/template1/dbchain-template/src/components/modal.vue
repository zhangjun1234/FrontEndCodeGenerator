<template>
  <el-dialog
    title="添加数据"
    :visible="visible"
    :show-close="false"
    width="60%"
  >
    <template #footer>
      <span class="dialog-footer">
        <el-button class="button" @click="() => handleBtnClick('cancel')"
          >取 消</el-button
        >
        <el-button
          class="button"
          type="primary"
          @click="() => handleBtnClick('ok')"
          :loading="confirmLoading"
          >确 定</el-button
        >
      </span>
    </template>
    <el-table stripe :data="dataSource">
      <el-table-column prop="id" label="iD" width="180"> </el-table-column>
      <el-table-column prop="fild" label="字段" width="180"> </el-table-column>
      <el-table-column prop="attribute" label="属性"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column fixed="right" label="Action">
        <template slot-scope="scope">
          <input
            type="text"
            class="input"
            placeholder="请输入内容"
            v-model="scope.row.value"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import * as dbchain from "dbchain-js-client";
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
      test: "",
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
    dataTransfer(arr) {
      let obj = {};
      const values = arr.map(
        (item) => (obj = { ...obj, [item.fild]: item.value })
      );
      return obj;
    },
    async handleBtnClick(mode) {
      if (mode === "cancel") return this.$emit("update:visible", false);
      const vm = this;
      this.confirmLoading = true;
      const addDataObj = this.dataTransfer(this.dataSource);
      const canInsrtRowResult = await dbchain.canInsertRow(
        this.dabseName,
        this.tableName,
        addDataObj
      );
      if (!canInsrtRowResult) {
        vm.confirmLoading = false;
        return vm.$message.error(
          "您插入的数据与现有表结构冲突，请检查属性与数据后重试"
        );
      }

      dbchain.insertRow(this.dabseName, this.tableName, addDataObj, () => {
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
<style scoped>
.button {
  width: 90px;
  height: 40px;
}
.input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>
