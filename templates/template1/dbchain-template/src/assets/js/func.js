import ElementUI from "element-ui";
import Vue from "vue";
/**
 * 定义阻止弹出窗的api地址
 */
const returnApiAlert = [
  "/auth/accounts/", //获取积分
  "/dbchain/tables/", //获取表信息
  "/blocks/latest", //获取首页相关
  "/blockchain/txs_num/", //获取首页相关
  "dbchain/tables/", //首页获取表名
  "dbchain/application/", //获取库权限属性等
  "/relay/txs/", //轮询区块是否完成
];

/**
 * 定义阻止请求失败弹出窗的api地址
 */
const returnErrorApiAlert = [
  "/auth/accounts/", //获取积分
  "/dbchain/tables/", //获取表信息
  "/blocks/latest", //获取首页相关
  "/blockchain/txs_num/", //获取首页相关
  "dbchain/tables/", //首页获取表名
  "dbchain/application/", //获取库权限属性等
  "/relay/txs/", //轮询区块是否完成(旧)
];
/**
 * 设置alert
 * type 类型  text 文本
 */

/**
 * 定义阻止loding的api地址
 * @param {*} type
 * @param {*} message
 * @param {*} responce
 */
const returnLodingApi = [
  "/auth/accounts/", //获取积分
  "/dbchain/tables/", //获取表信息
  "/blocks/latest", //获取首页相关
  "/blockchain/txs_num/", //获取首页相关
  "dbchain/tables/", //首页获取表名
  "dbchain/application/", //获取库权限属性等
  "/relay/txs/", //轮询区块是否完成
  "/dbchain/tx-simple-result/",//轮询
  // 'dbchain/check_chain_id',//验证chainid
  // 'dbchain/oracle/blockchain/all_applications',//数据库总数
];

export const setApiLoding = (config) => {
  let imgHttp = "/api/search";
  if (window.location.pathname.indexOf("/search/preview") !== -1) return true;
  for (var i = 0; i < returnLodingApi.length; i++) {
    let res = returnLodingApi[i];
    if (config.url.indexOf(res) !== -1) return true;
  }
};

export const setConfirm = (type, message, responce = false) => {
  console.log([type, message, responce]);
  let text;
  typeof message == "string"
    ? (text = message)
    : (text = message[Object.keys(message)[0]][0] || "");
  // console.log(text);
  console.log([type, message, responce]);
  // 全局定义拦截弹出
  if (responce) {
    let url =
      responce.config.url.indexOf("?") !== -1
        ? responce.config.url.split("?")[0]
        : responce.config.url;
    if (type == "error") {
      for (var i = 0; i < returnApiAlert.length; i++) {
        let res = returnApiAlert[i];
        // console.log([responce.config.url,responce.config.baseURL+res,responce.config.url==responce.config.baseURL+res])
        console.log(url);
        if (url == responce.config.baseURL + res || url == res) return true;
      }
    } else {
      for (var i = 0; i < returnErrorApiAlert.length; i++) {
        let res = returnErrorApiAlert[i];
        console.log(url);
        // console.log([responce.config.url, responce.config.baseURL + res, responce.config.url == responce.config.baseURL + res]);
        if (url == responce.config.baseURL + res || url == res) return true;
      }
    }
  }
  console.log(text);
  ElementUI.MessageBox({
    message: text,
    title: "提示",
    confirmButtonText: "知道了",
    center: "true",
    customClass: "confirm_message",
  });
};
/**
 * 设置message
 * type 类型  text文本
 */
export const setmessage = (type, text) => {
  new Vue().$message.closeAll();
  new Vue().$message({
    showClose: true,
    message: text,
    type: type,
  });
};

/**
 * 请求错误时是否展示弹出message
 * @param {*} config
 * @returns
 */
export const isErrorMessage = (config) => {
  for (var i = 0; i < returnErrorApiAlert.length; i++) {
    let res = returnErrorApiAlert[i];
    if (config.url.indexOf(res) !== -1) return true;
  }
};
