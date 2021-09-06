<template>
  <a-card style="width:90%" :bordered="false">
    <div slot="title">
      <p>Public key of the database:{{ dataBaseAppCode }}</p>
    </div>
    <a-button slot="extra" @click="handleAddDataClick">
      Add Data
    </a-button>
    <a-row>
      <a-col :span="3">
        <a-tree
          :tree-data="treeData"
          show-icon
          default-expand-all
          @select="handleTreeSelect"
          :default-selected-keys="['0-0-0']"
        >
          <a-icon slot="switcherIcon" type="down" />
          <a-icon slot="database" type="database" />
          <a-icon slot="table" type="table" />
        </a-tree>
      </a-col>
      <a-col :span="21">
        <a-table
          :row-key="(item) => item.id"
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
        >
        </a-table>
      </a-col>
    </a-row>
    <Modal
      :visible.sync="visible"
      :dabseName="dataBaseAppCode"
      :tableName="tableName"
      :fileds="fileds"
      @insetStatus="emitStatus"
    />
  </a-card>
</template>
<script>
const treeData = [
  {
    title: "数据库-ipfs",
    key: "0-0",
    slots: {
      icon: "smile",
    },
    children: [{ title: "user", key: "0-0-0", slots: { icon: "meh" } }],
  },
];
import * as dbchain from "dbchain-js-client";
import dayjs from "dayjs";
import Modal from "../components/modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      count: 30,
      dataBaseAppCode: "9UYHD3JWGK",
      tableName: "user",
      columns: [],
      dataSource: [],
      visible: false,
      fileds: [],
      treeData,
      dataBase: [],
    };
  },
  mounted() {
    this.getApps();
  },
  methods: {
    //新增数据
    handleAddDataClick() {
      this.visible = true;
    },
    emitStatus(fal) {
      if (fal) {
        this.initData();
      }
    },
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    onCheck(checkedKeys, info) {
      console.log("onCheck", checkedKeys, info);
    },
    handleTreeSelect(key, event) {
      this.tableName = key[0]
      this.initData(this.dataBaseAppCode, key[0]);
    },
    async initData(
      dataBaseAppCode = this.dataBaseAppCode,
      tableName = this.tableName
    ) {
      this.getTableRaw(dataBaseAppCode, tableName);
      this.getTable(dataBaseAppCode, tableName);
    },
    async getTable(dataBaseAppCode, tableName) {
      const tableData = await dbchain
        .Querier(dataBaseAppCode)
        .table(tableName)
        .val();
      this.dataSource = tableData.map((item) => ({
        ...item,
        created_at: dayjs(Number(item.created_at)).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
      }));
    },
    async getApps() {
      const result = await dbchain.getApps(true);
      const tableResult = await dbchain.getTables(result[0].appcode);
      // 渲染多张数据库
      // const treeData = result.map((item, index) => ({
      //   title: item.name,
      //   key: `${index}-${index}`,
      //   slots: { icon: "database" },
      //   children: tableResult.map((item,index) => ({ title: item, key: `0-0-${index}`, slots: { icon: "meh" } })),
      // }));
      // 渲染一个数据库
      const tbBase = {
        title: result[0].name,
        key: `${0}-${0}`,
        slots: { icon: "database" },
        children: tableResult.map((item, index) => ({
          title: item,
          key: item,
          slots: { icon: "table" },
        })),
      };
      this.treeData = [tbBase];
      this.initData(result[0].appcode, tableResult[0]);
      this.dataBaseAppCode = result[0].appcode;
    },

    async getTableRaw(dataBaseName, tableName) {
      const tableOptions = await dbchain.getTableRaw(dataBaseName, tableName);
      this.fileds = tableOptions.fields;
      this.columns = tableOptions.fields.map((item) => {
        return {
          title: item,
          key: item,
          dataIndex: item,
        };
      });
    },
  },
};
</script>

<style></style>
