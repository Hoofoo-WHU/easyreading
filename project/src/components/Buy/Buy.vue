<template>
  <action-sheet :show="value" @show="show" @hide="hide" @cancel="cancel">
    <container divider>
      <div class="amount">
        <div class="price"><icon class="icon" name="coin"></icon>{{cPrice}}</div>
        <div class="balance">当前余额 {{cBalance}}</div>
      </div>
    </container>
    <container divider>
      <ul class="info">
        <li><span class="label">书名</span><span class="value">{{title}}</span></li>
        <li><span class="label">作者</span><span class="value">{{author}}</span></li>
      </ul>
      <div class="buttonwrapper">
        <button-item v-if="canBuy" class="button" @tap="buy">购买</button-item>
        <button-item v-else class="button" @tap="deposit">充值</button-item>
      </div>
    </container>
  </action-sheet>
</template>
<script>
import { ActionSheet } from '@/components/ActionSheet'
import Container from '@/components/Container'
import ButtonItem from '@/components/ButtonItem'
import Icon from '@/components/Icon'
export default {
  name: 'Buy',
  components: {
    ActionSheet,
    Container,
    ButtonItem,
    Icon
  },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    title: {
      type: String,
      default: '缺省'
    },
    author: {
      type: String,
      default: '缺省'
    },
    price: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cPrice: function () {
      return this.price.toFixed(2)
    },
    cBalance: function () {
      return this.balance.toFixed(2)
    },
    canBuy: function () {
      return this.price <= this.balance
    }
  },
  data () {
    return {
    }
  },
  methods: {
    buy: function () {
      this.$emit('buy')
    },
    deposit: function () {
      this.$emit('deposit')
    },
    show: function () {
      this.$emit('show')
    },
    hide: function () {
      this.$emit('hide')
    },
    cancel: function () {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="stylus" scoped>
.amount{
  height: 120px;
  box-sizing: border-box;
  padding: 1em;
  .price{
    font-size: 40px;
    font-family: SourceHanserif;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon{
      width: 0.8em;
      height: 0.8em;
      margin-right: .3em;
      margin-top: .1em;
    }
  }
  .balance{
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    color: #db5149;
  }
}
.info{
  padding: 1em;
  box-sizing: border-box;
  list-style: none;
  li{
    display: flex;
    font-size: 14px;
    line-height: 30px;
    white-space: nowrap;
  }
  .label{
    color: #ccc;
    margin-right: 1em;
  }
  .value{
    flex-grow: 1;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.buttonwrapper{
  padding: 1em;
  padding-top: 0;
  .button{
    height: 44px;
    border: 1px solid #157afb;
    border-radius: 22px;
    line-height: 44px;
    text-align: center;
    color: #157afb;
    &:active{
      background: none;
      opacity: 0.5;
    }
  }
}
</style>
