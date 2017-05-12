<template lang="html">
  <transition name="message-show" style="z-index:1000">
      <div class="message" v-show="show">
          <icon class="icon" :name="iconName"></icon>
          <p> {{ messageText }} </p>
      </div>
  </transition>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'Message',
  props: {
    iconName: {
      type: String,
      default: 'ok'
    },
    messageText: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    closeTime: {
      type: Number,
      default: 1000
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    value (val) {
      this.show = val
      if (val) {
        this.closeMessage()
      }
    },
    show (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    closeMessage () {
      setTimeout(() => {
        document.body.style.overflow = 'hidden'
        this.show = false
      }, this.closeTime)
    }
  }
}
</script>

<style lang="stylus" scoped>
.message-show-enter-active{
    transition: transform .2s
}
.message-show-enter{
    transform: translateY(-100%);
}
.message-show-leave-active{
    transition: opacity .5s
}
.message-show-leave-to{
    opacity: 0;
}
.message {
    z-index: 1010;
    position: fixed;
    top: 28%;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
    height: 30px;
    background-color: rgba(55, 55, 55, 0.6);
    display: flex;
    justify-content: center;
    border-radius: 12px;
    .icon {
        width: 10%;
        color: #fff;
    }
    p {
        text-align: center;
        margin: 0 12px;
        line-height: 30px;
        color: #fff;
    }
}
</style>
