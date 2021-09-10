<template>
  <div class="_sele"  @mouseover="hover=true"
      @mouseleave="hover=false" :class="[hover?'_ishover':'','_sele']">
    <span class="_icon_select" v-if="icon"
      ><icon-svg
        :icon-class="icon"
    /></span>
    <el-select
      v-model.trim="selectDataT"
      placeholder="placeholder"
      @focus="$global.setActiveInput($event, 1)"
      @blur="$global.setActiveInput($event, 0)"
      
     
      @visible-change="
        (status) => {
          return openSelect(status, 2);
        }
      "
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <div class="_block">
          <span class="_icon" v-if="item.icon">
            <icon-svg :icon-class="item.icon"></icon-svg>
          </span>
          <span>{{ item.label }}</span>
        </div>
      </el-option>
    </el-select>
    <span class="_icon"
      ><icon-svg
        :icon-class="
          selectStatus.index == 2 && selectStatus.status
            ? 'icon-xiajiantouicon'
            : 'icon-youjiantouicon'
        "
    /></span>
  </div>
</template>

<script>
export default {
  props: {
    selectData: String,
    options: Array,
    placeholder: String,
    icon:String
  },
  computed: {
    selectDataT: {
      get() {
        return this.selectData;
      },
      set(val) {
        this.changeSelect(val);
      },
    },
  },
  data() {
    return {
      // 当前选中下拉
    hover:false,
      selectStatus: {
        index: 0,
        status: false,
      },
    };
  },
  methods: {
    // 设置下拉框张开的箭头
    openSelect(status, index) {
      this.selectStatus = {
        index: index,
        status,
        status,
      };
    },
    // 当前选中触发
    changeSelect(e) {
      this.$emit("changeSelect", e);
    },
  },
};
</script>

<style lang="scss" scoped>
._sele {
  position: relative;
  color: #000;
  &:first-child {
    min-width: 56px;
    height: 30px;
  }
  &:last-child {
    min-width: 56px;
    height: 30px;
  }
  ._icon {
    width: 22px;
    height: 22px;
    background: #fafafa;
    border-radius: 6px;
    font-size: 16px;
    position: absolute;
    right: 4px;
    top: 4px;
    color: #000;
    display: inline-block;
    text-align: center;
    line-height: 22px;
    pointer-events: none;
  }
  ._icon_select{
    width: 22px;
    height: 22px;
    font-size: 16px;
    color: #000;
    position: absolute;
    left: 6px;
    top: 1px;
    z-index: 2;
  }
}
._sele._flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 14px;
  ._text {
    margin-left: 4px;
  }
}
</style>
