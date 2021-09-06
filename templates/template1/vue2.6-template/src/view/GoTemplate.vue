<template>
  <a-card>
    <div slot="title">
      <!-- <p>Public key of the database:{{ dataBaseAppCode }}</p> -->
    </div>
    <a-button slot="extra" @click="handleAddDataClick">
      Add Data
    </a-button>
    <a-row>
      <a-col :span="3">
        <Tree @clickUser="handleTreeClick" :currentTable="currentTable" />
      </a-col>
      <a-col :span="21">
        <TableStructureVue :currentTable="currentTable" />
        <ul class="table">
          <li class="row" v-for="(item, index) in dataSource" :key="index">
            <span class="filed" v-for="(i, index) in item" :key="index">{{
              i
            }}</span>
          </li>
        </ul>
      </a-col>
    </a-row>
    <Modal
      :visible.sync="visible"
      :dabseName="dataBaseAppCode"
      :tableName="currentTable"
      :fileds="fileds"
      @insetStatus="emitStatus"
    />
  </a-card>
</template>
<script>
import Tree from "../template/tree.vue";
import TableStructureVue,{tableList} from "../template/tableStructure.vue";
import Modal from "../components/modal.vue";
import * as dbchain from "dbchain-js-client";
import dayjs from "dayjs";
import { sortFiledData } from "../utils";

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
      // this.getTable(this.dataBaseAppCode, this.currentTable);
      this.initData(this.dataBaseAppCode,this.currentTable)
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
      const currentFilds = this.tableList.filter(
        (item) => item.name === tableName
      )[0].field;
      const sort = fieldSorting(currentFilds);
      this.dataSource = sortFiledData(sort, dataSource);
    },
    async getTableRaw(dataBaseName, tableName) {
      const tableOptions = await dbchain.getTableRaw(dataBaseName, tableName);
      this.fileds = tableOptions.fields;
      console.log(this.fileds);
      // this.columns = tableOptions.fields.map((item) => {
      //   return {
      //     title: item,
      //     key: item,
      //     dataIndex: item,
      //   };
      // });
    },
  },
};
</script>

<style lang="css" scoped>
.row {
  list-style: none;
  width: 20%;
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
