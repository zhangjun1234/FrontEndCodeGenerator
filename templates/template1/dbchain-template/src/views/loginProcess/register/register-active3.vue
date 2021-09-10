<template>
  <div class="_register">
    <div class="_tit">
      <span class="_p">验证助记词顺序</span>
    </div>
    <div class="_content">
      <span
        class="_block"
        v-for="(item, index) in validate_key"
        :key="index"
        :class="[
          !item.val
            ? ''
            : item.val == create_key[index]
            ? 'isSuccessMnemoic'
            : 'isErrorMnemonic',
        ]"
      >
        <span class="_absolute">{{ index + 1 }}</span>
        <span class="_text _one_omit">{{ item.val ? item.val : "" }}</span>
        <span
          class="_icon"
          v-if="item.val !== create_key[index]&&item.val"
          @click="resetShufflekey(item)"
        >
          <icon-svg icon-class="icon-guanbi" />
        </span>
      </span>
    </div>
    <div class="_desc">
      <p class="_title">提示：请将下列助记词按正确顺序排列</p>
    </div>
    <div class="_cont">
      <span
        v-for="(item, index) in getshuffle_key()"
        :key="index"
        class="_shuffle_key_block"
      >
        <span class="_block" v-if="item.val" @click="setValidateKey(item)">
          {{ item.val }}
        </span>
      </span>
    </div>
    <div class="_footer">
      <div class="_login_btn isErrorShow" v-if="!compareCreateAndValidate()">
        进入控制台
      </div>
      <div v-else class="_login_btn" @click="setActive(2)">进入控制台</div>
      <div class="_footer_flex">
        <!-- <span class="_text" @click="ToLogin()"
          >进入上次控制台</span
        >
        <span class="_text" @click="$router.push('/imlogin')"
          >导入现有助记词</span
        > -->
      </div>
    </div>
  </div>
</template>
<script>

import { shuffle } from "@/utils/mUtils.js";

export default {
  // mixins: [mixinsRegister],
  data() {
    return {
      validate_key: new Array(12).fill(""),
    };
  },
  methods: {
    setValidateKey(item) {
      let { val, id } = item;
      let rmshuffle_key = (id) => {
        for (let j = 0; j < this.shuffle_key.length; j++) {
          if (this.shuffle_key[j].id == id) {
            return (this.shuffle_key[j].val = "");
          }
        }
      };
      console.log(val, id, item);
      for (let i = 0; i < this.validate_key.length; i++) {
        let el = this.validate_key[i];
        if (!el.val) {
          console.log(el, item);
          this.validate_key[i] = { ...item };
          rmshuffle_key(id);
          return this.$forceUpdate();
        }
      }
    },
    getshuffle_key() {
      return this.shuffle_key.filter((res) => {
        return res.val;
      });
    },
    // 点击删除按钮还原位置
    resetShufflekey(item) {
      console.log(item);
      let rmValidateKey = (item) => {
        for (let i = 0; i < this.validate_key.length; i++) {
          if (this.validate_key[i].id == item.id) {
            this.validate_key[i].val = "";
          }
        }
      };
      for (let i = 0; i < this.shuffle_key.length; i++) {
        if (this.shuffle_key[i].id == item.id) {
          this.shuffle_key[i].val = item.val;
          rmValidateKey(item);
          return this.$forceUpdate();
        }
      }
    },

    // 比较用户排序后的数组和初始值是否一致
    compareCreateAndValidate() {
      if (
        this.validate_key.filter((res) => {
          return res.val;
        }).length !== this.create_key.length
      )
        return false;
      for (let i = 0; i < this.validate_key.length; i++) {
        if (this.validate_key[i].val !== this.create_key[i]) return false;
      }
      return true;
    },
    // 下一步
    setActive(val) {
      this.$message.success("已成功进入控制台");
      return this.$router.push("/database/default");
      // this.$parent.setActive(val)
    }, // 跳转登录
    ToLogin() {
      if (!hasKey()) {
        return this.$message.error("无账号,请先注册账号");
      }
      return this.$router.push("/login");
    },
  },
  computed: {
    mnemonic() {
      return this.$store.getters.getMnemonic;
    },
    // 对比助记词顺序和内容是否一致的最初值
    create_key() {
      return this.$store.getters.getMnemonic.split(" ");
    },
    // 随机打乱顺序后的值
    shuffle_key() {
      let arr = shuffle(this.$store.getters.getMnemonic.split(" "));
      let arrObj = [];
      arr.forEach((item, index) => {
        arrObj[arrObj.length] = { val: item, id: index };
      });
      return arrObj;
    },
  },
};
</script>
<style lang="scss" scoped src="./register.scss"></style>
<style lang="scss" scoped>
._register {
  ._content {
    ._block {
      background: #eeeeee;
      color: #a6a6a6;
    }
    ._icon {
      position: absolute;
      bottom: 0px;
      cursor: pointer;
      right: 6px;
    }
  }
  ._desc {
    padding: 9px 0 12px 0;
    ._title {
      margin-top: 2px;
    }
  }
  ._cont {
    padding-bottom: 27px;
    text-align: left;
    height: 150px;
    ._shuffle_key_block {
      ._block {
        display: inline-block;
        height: 38px;
        border-radius: 8px;
        border: 1px solid #2caf71;
        margin: 0 10px 10px 0;
        color: #2caf71;
        line-height: 38px;
        cursor: pointer;
        text-align: center;
        width: 23.3%;
      }
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12) {
        ._block {
          margin-right: 0;
        }
      }
    }
  }
  ._footer {
    ._login_btn.isErrorShow {
      background: #dcdcdc;
      cursor: no-drop;
    }
  }
}
</style>
