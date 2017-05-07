<template lang="html">
  <modal v-model="show" :on-ok="confirmShop" :ok-text="'确认支付'">
    <div slot="header">
        购买本书
    </div>
    <div class="shop-modal">
        <p>{{ book.name }}</p>
        <p class="price">价格：{{ book.price }}阅币</p>
        <p>您还剩余 {{ userHold }}阅币</p>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  name: 'shop',
  components: {
    Modal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    book: {
      type: Object,
      default: function () {
        return {
          name: '变形计',
          price: '13代币'
        }
      }
    },
    userHold: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      show: false,
      messageShow: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    confirmShop () {
      this.messageShow = true
      this.shopModalShow = false
      this.$emit('paySuccess', '购买成功')
    }
  }
}
</script>

<style lang="css">
</style>
