import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoding: false, //搜索loding
    isRouterAlive: true, //相同路由刷新组件
    argumentsList: [
      {
        name: "沙盒测试1",
        baseUrl: "/relay",
        chainId: "testnet",
        id: "0",
      },
    ],
    isActiveArgumentsId: "", //当前使用的访问参数
    isRelaveMenu: false, //刷新菜单
    menuData: [], //菜单数据
    appCode: "",
    mnemonic: "", //助记词
    registerisActive: 0, //当前注册进度
    clientHeight: document.body.clientHeight, //记录当前屏幕高
    clientWidth: document.body.clientWidth, //记录当前屏幕宽
  },

  getters: {
    // 查询搜索loding
    getIsLoding: (state) => state.isLoding,
    getIsRouterAlive: (state) => state.isRouterAlive,
    // 是否刷新菜单
    getIsRelaveMenu: (state) => state.propertyMap,
    // 获取菜单列表
    getMenuData: (state) => state.menuData,
    //获取当前appCode
    // 获取助记词
    getMnemonic: (state) => state.mnemonic,
    // 获取当前注册进度
    getRegisterisActive: (state) => state.registerisActive,
    // 获取当前记录的屏幕高
    getClientHeight: (state) => state.clientHeight,
    // 获取当前记录的屏幕宽
    getClientWidth: (state) => state.clientWidth,
    // 获取当前appCode
    getAppCode: (state) => state.appCode,
  },
  mutations: {
    // 设置loding
    setIsLoding(state, isLoding = false) {
      state.isLoding = isLoding;
    },
    //获取是否刷新页面
    setIsRouterAlive(state, data = false) {
      state.isRouterAlive = data;
    },
    // 设置当前选中参数id
    setActiveArgumentsId(state, data) {
      state.isActiveArgumentsId = data;
    },
    // 设置是否刷新菜单
    SET_ISRELAVE_MENU(state, data) {
      console.log(state, data);
      state.isRelaveMenu = data;
    },
    // 更新菜单数据
    setMenuData(state, data) {
      state.menuData = data;
    },
    // 设置助记词
    setMnemonic(state, data) {
      state.mnemonic = data;
    },
    // 设置注册进度
    setRegisterisActive(state, data) {
      state.registerisActive = data;
    },
    // 设置当前屏幕高
    setClientHeight(state, data) {
      state.clientHeight = data;
    },
    // 设置当前屏幕宽
    setClientWidth(state, data) {
      state.clientWidth = data;
    },
  },
  actions: {
    // 相同路由刷新组件
    setIsRouterAlive(context, data) {
      context.commit("setIsRouterAlive", data);
    },

    setIsRelaveMenu(context, data) {
      context.commit("SET_ISRELAVE_MENU", data);
    },
  },
  modules: {},
});
