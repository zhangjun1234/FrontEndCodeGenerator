let that;

import {
  commit,
  getAddress
} from "dbchain-js-client";
import * as dbchain_js_client from "dbchain-js-client";
import {
  createApplication,
  getTableFieldsDetail,
  getFunctions,
  getFunctionOptions,
  getCustomQueriers,
  getCustomQuerierOptions,
  getFieldIndex,
  getApps,
  getApp,
  getTableMemo,
  getTables,
  getTableOptions,
  getTrigger,
  getInsertFilter,
} from "@/custom/rest_client";

import * as custom_js_client from "@/custom/rest_client";
console.log(dbchain_js_client, custom_js_client);
import { saveJSON, getFileJson, _chunk } from "@/utils/mUtils";
export const mixinsImport = {
  data() {
    return {};
  },
  created() {
    that = this;
    console.log(that);
  },
  methods: {
    // 导出整个库
    async exportDatabase(appCode = this.appCode) {
      that.$Anim.showAnim({
        type: "save",
        time: "300000",
        title: "数据库导出中",
        text: "正在导出数据库,请稍候",
      });
      let dataJson = {
        appCode: appCode,
        memo: "",
        table: [
          {
            name: "", //表名
            memo: "", //表备注
            field: [
              {
                name: "",
                memo: "",
                propertyArr: [],
              },
            ],
            filter: "",
            trigger: "",
          },
        ],
        type: 1,
        permission_required: false,
      };
      let menu = await getApp(appCode);
      dataJson.name = menu.name;
      dataJson.memo = menu.description;
      dataJson.appCode = menu.appcode;
      let custom = await that.getAppCustomJson();
      dataJson = { ...dataJson, ...custom };
      menu.permission_required = menu.permission_required;
      let table = await getTables(appCode);
      for (let j = 0; j < table.length; j++) {
        const el_table = table[j];
        // 获取表备注
        let tableObj = await this.getTableJson(appCode, el_table);
        dataJson.table[j] = tableObj;
      }
      that.$Anim.closeAll();
      that.$message.success("数据导出操作已完成，请查看");
      saveJSON(dataJson, `lib_${menu.name}.dbchain`);
    },
    // 获取单个表json
    async getTableJson(appCode = this.appCode, tableKey = this.tableKey) {
      let tableObj = {
        name: tableKey, //表名
        memo: "", //表备注
        field: [
          {
            name: "",
            memo: "",
            propertyArr: [],
            fieldType: "",
          },
        ],
        filter: "",
        trigger: "",
      };

      let memo = await getTableMemo(appCode, tableKey);
      tableObj.memo = memo;
      // 获取表字段
      let fieldOptionsList = await getTableFieldsDetail(appCode, tableKey);
      // 获取表属性
      let option = (await getTableOptions(this.appCode, tableKey)) || [];

      // 获取过滤器
      let filter = await getInsertFilter(that.appCode, tableKey);
      console.log(filter);
      tableObj.filter = filter;
      // 获取脚本
      let trigger = await getTrigger(that.appCode, tableKey);
      console.log(trigger);
      tableObj.trigger = trigger;
      // 获取索引
      let indexs = await getFieldIndex(that.appCode, tableKey);

      tableObj.options = option;
      // 循环取出每一个字段的属性
      for (let i = 0; i < fieldOptionsList.length; i++) {
        const element = fieldOptionsList[i];
        tableObj.field[i] = {
          name: element.name,
          memo: element.comment || "",
          // id: index + 1,
          propertyArr: element.options,
          fieldType: element.fieldType,
          isIndex: indexs.indexOf(element.name) !== -1 ? true : false,
        };
      }
      return tableObj;
    },
    // 导出单个表
    async exportTable(appCode = this.appCode, tableKey = this.tableKey) {
      that.$Anim.showAnim({
        type: "save",
        time: "300000",
        title: "数据库导出中",
        text: "正在导出数据库",
      });
      let dataJson = {
        appCode: appCode,
        name: "",
        memo: "",
        table: [],
        type: 2,
        permission_required: false,
      };
      let menu = await getApp(appCode);
      console.log(menu);
      let tableObj = await this.getTableJson(appCode, tableKey);
      console.log(tableObj);
      dataJson.table = [tableObj];
      dataJson.name = menu.name;
      dataJson.memo = menu.description;
      dataJson.appCode = menu.appcode;
      menu.permission_required = menu.permission_required;
      console.log(dataJson);
      saveJSON(dataJson, `table_${tableKey}.dbchain`);
      that.$Anim.closeAll();
      that.$message.success("数据导出操作已完成，请查看");
      return dataJson;
    },
    // json导入表格和库
    async importTable(json, code = null) {
      console.log(json, code);
      let appCode = this.appCode;
      that.$Anim.showAnim({
        type: "upload",
        time: "300000",
        title: "数据库导入中",
        text: "正在导入数据库",
      });
      try {
        let logs = [];

        // 创建表
        const createTableToJson = () => {
          console.log(appCode);
          let insertData = [];
          console.log(json);
          console.log(json.table.length);
          for (let i = 0; i < json.table.length; i++) {
            let etable = json.table[i];
            console.log(etable);
            // 创建表
            logs.push([`createTable`, [appCode, etable.name, false], "创建表"]);
            // 设置表备注
            if (etable.memo) {
              logs.push([
                `setTableMemo`,
                [appCode, etable.name, etable.memo, false],
                "设置表备注",
              ]);
            }
            // 设置表过滤器

            if (etable.filter) {
              logs.push([
                `addInsertFilter`,
                [appCode, etable.name, etable.filter, false],
                "设置表过滤器",
              ]);
            }
            // 设置表触发器
            if (etable.trigger) {
              logs.push([
                `addTrigger`,
                [appCode, etable.name, etable.trigger, false],
                "设置表触发器",
              ]);
            }

            try {
              // 设置表属性
              for (let j = 0; j < etable.options.length; j++) {
                const eOption = etable.options[j];
                logs.push([
                  `modifyTableOption`,
                  [appCode, etable.name, "add", eOption, false],
                  "设置表属性",
                ]);
              }
            } catch (error) {
              console.log("无属性");
            }
            for (let j = 0; j < etable.field.length; j++) {
              let efield = etable.field[j];
              console.log(efield);
              // 创建字段
              console.log(efield, etable);
              logs.push([
                `addField`,
                [appCode, etable.name, efield.name, false],
                "创建字段",
              ]);
              if (efield.memo) {
                logs.push([
                  `setFieldMemo`,
                  [appCode, etable.name, efield.name, efield.memo],
                  false,
                  "设置字段备注",
                ]);
              }
              // 设置属性
              for (let x = 0; x < efield.propertyArr.length; x++) {
                let efieldOptions = efield.propertyArr[x];
                console.log(efieldOptions);
                logs.push([
                  `modifyFieldOption`,
                  [
                    appCode,
                    etable.name,
                    efield.name,
                    "add",
                    efieldOptions,
                    false,
                  ],
                  "设置属性",
                ]);
              }
              // 设置类型
              if (efield.fieldType) {
                logs.push([
                  `setFieldType`,
                  [appCode, etable.name, efield.name, efield.fieldType, false],
                  "设置类型",
                ]);
              }
              // 设置索引 CreateFeildIndex(appCode, TableName , FieldName, callback)
              if (efield.isIndex) {
                logs.push([
                  `CreateFeildIndex`,
                  [appCode, etable.name, efield.name, false],
                  "设置索引",
                ]);
              }
            }
            console.log("创建当前表字段完成");
          }
        };
        // 创建自定义函数和
        const createCustomFn = () => {
          console.log(appCode);
          if (json.custom_fns)
            for (let i = 0; i < json.custom_fns.length; i++) {
              let el_custom_fns = json.custom_fns[i];
              console.log(el_custom_fns.description);
              console.log(el_custom_fns.body);
              logs.push([
                `addFunctions`,
                [appCode, el_custom_fns.description, el_custom_fns.body],
                "创建自定义函数和",
              ]);
            }
        };
        // 创建自定义查询器
        const createCustomQuerier = () => {
          console.log(appCode);
          for (let i = 0; i < json.custom_queriers.length; i++) {
            let el_custom_queriers = json.custom_queriers[i];
            console.log(el_custom_queriers.description);
            console.log(el_custom_queriers.body);
            logs.push([
              `addCustomQuerier`,
              [
                appCode,
                el_custom_queriers.description,
                el_custom_queriers.body,
              ],
              "创建自定义查询器",
            ]);
          }
        };
        // 函数处理
        const callFunction = function () {
          let arrTo = _chunk(logs, 55);
          for (let i = 0; i < arrTo.length; i++) {
            const element = arrTo[i];
            for (let j = 0; j < element.length; j++) {
              const element1 = element[j];
              dbchain_js_client[element1[0]]
                ? dbchain_js_client[element1[0]](...element1[1])
                : custom_js_client[element1[0]](...element1[1]);
            }
            if (i == arrTo.length - 1) {
              return commit(function () {
                console.log("表创建成功");
                //通知刷新菜单
                that.$store.dispatch("setIsRelaveMenu", new Date().getTime());
                logs.push(["commit"]);
                that.$Anim.closeAll();
                that.$message.success("数据导入操作已完成");
              });
            }
            commit(true);
          }
        };
        if (json.type == 2) {
          return createTableToJson();
        }
        // 有传入code时说明我要在当前库导入
        if (code) {
          appCode = code;
          createCustomFn();
          createCustomQuerier();
          createTableToJson();
          // 所有logs开始执行
          callFunction();

          console.log(logs);
          return that.$store.dispatch("setIsRelaveMenu", new Date().getTime());
        } else {
          createApplication(
            json.name,
            json.memo,
            json.permission_required,
            async function (value) {
              console.log(value);
              let arr = await getApps(true);
              console.log(arr);
              arr = arr.sort((a, b) => {
                return b.appid - a.appid;
              });
              console.log(arr);
              let address = getAddress();
              console.log(address, json.name, json.memo);
              arr = arr.filter((res) => {
                return (
                  res.owner == address &&
                  res.name == json.name &&
                  res.description == json.memo
                );
              });

              console.log(arr);
              if (!arr[0]) {
                that.$Anim.closeAll();
                return that.$message.error(
                  "您没有此库，请检查当前账号是否具有创库权限"
                );
              }
              appCode = arr[0].appcode;
              console.log(appCode);
              createCustomFn();
              createCustomQuerier();
              createTableToJson();
              // 所有logs开始执行
              callFunction();

              console.log(logs);
              that.$store.dispatch("setIsRelaveMenu", new Date().getTime());
            }
          );
        }
      } catch (error) {
        console.log(error);
        that.$Anim.closeAll();
        return that.$message.error("dbchain文件解析失败，请重新导出文件");
      }
    },
    // file类型需上传文件
    async uploadFile(e, code = null) {
      console.log(e);
      let file = e.target.files[0];
      let json = await getFileJson(file);
      console.log(json);
      if (typeof json == "string") return this.$message.error(json);
      this.importTable(json, code);
    },

    //获取自定义函数和自定义查询器json
    async getAppCustomJson() {
      let obj = {
        custom_fns: [],
        custom_queriers: [],
      };
      // 获取库自定义函数
      let custom_fns = await getFunctions(that.appCode);
      console.log(custom_fns);
      for (let i = 0; i < custom_fns.length; i++) {
        const element = custom_fns[i];
        let functionOptions = await getFunctionOptions(that.appCode, element);
        obj.custom_fns[obj.custom_fns.length] = functionOptions;
      }
      // 获取库自定义查询器
      let custom_queriers = await getCustomQueriers(that.appCode);
      console.log(custom_queriers);
      for (let i = 0; i < custom_queriers.length; i++) {
        const element = custom_queriers[i];
        let querierOptions = await getCustomQuerierOptions(
          that.appCode,
          element
        );
        obj.custom_queriers[obj.custom_queriers.length] = querierOptions;
      }

      console.log(obj);
      return obj;
    },
  },
  computed: {
    appCode() {
      return this.$route.params.appCode;
    },
    tableKey() {
      return this.$route.params.tableKey;
    },
  },
};
