<template>
  <div class="_default">
    <div class="_head">
      <icon-svg icon-class="icon-logozhuce" width="334" height="83"></icon-svg>
    </div>
    <div class="_cont _headT">
      <div class="_tit">欢迎您来到DBChain！</div>
      <div class="_text">
        DBChain是区块链关系型数据库，助记词是您唯一的身份确认，丢失无法找回，请妥善保管！
      </div>
    </div>

    <div class="_cont">
      <div class="_tit">助记词安全储存小秘诀</div>
      <div class="_text">·将助记词保存在纸上；</div>
      <div class="_text">·在多处备份；</div>
      <div class="_text">·不要分享此助记词给别人；</div>
      <div class="_text">·库链永远不会主动询问您的助记词；</div>
    </div>
    <div class="_foot">
      <div class="_btn" @click="$router.push('/lead/choice')">我知道了</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
._default {
  width: 821px;
  margin: 0 auto;
  height: 100%;
  ._head {
    padding-top: 8.2vh;
    padding-bottom: 10.89vh;
    height: 83px;
    display: flex;
    img {
      height: 54px;
    }
  }
  ._cont {
    margin-bottom: 44px;
    ._tit {
      font-size: 30px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #000000;
      line-height: 45px;
      margin-bottom: 14px;
      text-align: left;
    }
    ._text {
      text-align: left;
      font-size: 20px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #000000;
      line-height: 30px;
      margin-bottom: 12px;
    }
    &:last-child {
      margin-bottom: 17vh;
    }
  }
  ._foot {
    display: flex;
    justify-content: center;
    padding-top: 8.63%;
    // padding-bottom: 8%;
    ._btn {
      width: 491px;
      height: 56px;
      background: #2caf71;
      border-radius: 6px;
      font-size: 20px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #ffffff;
      line-height: 56px;
      cursor: pointer;
    }
  }
  ._headT {
    ._tit {
      height: 36px;
    }
  }
}
</style>
