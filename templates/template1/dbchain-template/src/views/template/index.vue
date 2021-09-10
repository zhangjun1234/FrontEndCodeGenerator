<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>模板</span>
        <el-button class="button" size="medium" @click="handleAddDataClick"
          >Add Data</el-button
        >
      </div>
    </template>
    <el-row>
      <el-col :span="3">
        <Tree @clickUser="handleTreeClick" :currentTable="currentTable" />
      </el-col>
      <el-col :span="21">
        <TableStructureVue :currentTable="currentTable" />
        <ul class="table">
          <li class="row" v-for="(item, index) in dataSource" :key="index">
            <span class="filed" v-for="(i, index) in item" :key="index">{{
              i
            }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <Modal
      :visible.sync="visible"
      :dabseName="dataBaseAppCode"
      :tableName="currentTable"
      :fileds="fileds"
      @insetStatus="emitStatus"
    />
  </el-card>
</template>
<script>
import Tree from "./tree.vue";
import TableStructureVue, { tableList } from "./tableStructure.vue";
import Modal from "@/components/modal";
import * as dbchain from "dbchain-js-client";
import dayjs from "dayjs";
import { sortFiledData } from "@/utils";

function fieldSorting(fileds) {
  return fileds.map((item, index) => ({ name: item.name, sort: index }));
}
export default {
  components: {
    Tree,
    TableStructureVue,
    Modal,
  },
  data() {
    return {
      currentTable: "",
      visible: false,
      dataBaseAppCode: "9UYHD3JWGK",
      dataSource: [],
      filedSort: [],
      tableList,
      fileds: [],
    };
  },
  created() {
      localStorage.setItem('dbchain_base_url',"http://controlpanel.dbchain.cloud/relay")
      let passphrase = sessionStorage.getItem("passphrase");
      let sshKey = localStorage.getItem("dbchainwallet");
      if (!sshKey) {
        return this.$router.push("/lead/default");
      } else if (!passphrase) {
        return this.$router.push("/login");
      }
  },
  methods: {
    handleAddDataClick() {
      this.visible = true;
    },
    emitStatus(fal) {
      if (fal) {
        this.initData();
      }
    },
    handleTreeClick(table) {
      this.currentTable = table;
      this.initData(this.dataBaseAppCode, this.currentTable);
    },
    async initData(
      dataBaseAppCode = this.dataBaseAppCode,
      tableName = this.currentTable
    ) {
      this.getTableRaw(dataBaseAppCode, tableName);
      this.getTable(dataBaseAppCode, tableName);
    },
    async getTable(dataBaseAppCode, tableName) {
      const tableData = await dbchain
        .Querier(dataBaseAppCode)
        .table(tableName)
        .val();
      const dataSource = tableData.map((item) => ({
        ...item,
        created_at: dayjs(Number(item.created_at)).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
      }));
      console.log(dataSource);
      const currentFilds = this.tableList.filter(
        (item) => item.name === tableName
      )[0].field;
      const sort = fieldSorting(currentFilds);
      this.dataSource = sortFiledData(sort, dataSource);
    },
    async getTableRaw(dataBaseName, tableName) {
      const tableOptions = await dbchain.getTableRaw(dataBaseName, tableName);
      this.fileds = tableOptions.fields;
    },
  },
};
</script>

<style lang="css" scoped>
.row {
  list-style: none;
  width: 20%;
}
.button {
  width: 90px;
  height: 40px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table {
  display: flex;
  margin: 0;
  padding: 0;
}
.filed {
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 50px;
  border-bottom: 1px solid #eee;
  line-height: 50px;
}
</style>
