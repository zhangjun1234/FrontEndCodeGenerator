<template>
  <div class="_choice">
    <div class="_head">
      <backHeader :back="true" />
    </div>
    <div class="_log">
      <icon-svg
        icon-class="icon-logozhuce"
        :width="334"
        :height="83"
      ></icon-svg>
    </div>

    <p class="_p">开启DBCHAIN账号</p>

    <div class="_check">
      <div class="_list" @click="$router.push('/imlogin')">
        <span class="_icon">
          <icon-svg icon-class="icon-yiyouzhujici" />
        </span>
        <span class="_text"> 我已有助记词，导入开启 </span>
      </div>
      <div class="_list" @click="$router.push('/register')">
        <span class="_icon">
          <icon-svg icon-class="icon-chuangjian" />
        </span>
        <span class="_text"> 我没有助记词，立即创建 </span>
      </div>
    </div>
  </div>
</template>

<script>
import backHeader from "./_header.vue";
export default {
  components: {
    backHeader,
  },
};
</script>

<style lang="scss" scoped>
._choice {
  background: #f5f5f5;
  height: 100%;
  ._head {
    padding-bottom: 8px;
  }
  ._log {
    height: 78px;
    font-size: 333px;
    display: flex;
    img {
      height: 78px;
    }
    margin-bottom: 45px;
  }
  ._p {
    font-size: 24px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #4c4668;
    line-height: 36px;
    margin-bottom: 40px;
  }
  ._check {
    display: flex;
    justify-content: center;
    ._list {
      width: 500px;
      height: 288px;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      cursor: pointer;
      ._icon {
        font-size: 70px;
        color: #adadad;
        position: relative;
        top: 66px;
      }
      ._text {
        width: 100%;
        font-size: 22px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #000000;
        line-height: 33px;
      }
      &:first-child {
        margin-right: 36px;
      }
    }
  }
}
</style>
