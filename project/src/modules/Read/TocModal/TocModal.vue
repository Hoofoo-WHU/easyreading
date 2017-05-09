<template>
  <div class="wrapper">
    <transition name="fade">
      <touch v-if="show" class="back" @tap="cancel"></touch>
    </transition>
    <transition name="trans">
      <touch v-if="show" class="content" @tap="stop">
        <slot></slot>
      </touch>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TocModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$emit('show')
      } else {
        setTimeout(() => {
          this.$emit('hide')
        }, 400)
      }
    }
  },
  methods: {
    cancel (e) {
      setTimeout(() => {
        this.$emit('cancel')
      }, 0)
    },
    stop (e) {
      e.srcEvent.stopImmediatePropagation()
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper{
  z-index: 300;
  // position: relative;
  .back{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #0005;
    z-index: 300;
  }
  .content{
    position: absolute;
    left: 0;
    right: 10%;
    bottom: 0;
    top: 0;
    overflow: hidden;
    z-index: 300;
    background: #fff;
  } 
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.4s cubic-bezier(.3,.5,.29,.99);
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
.trans-enter-active, .trans-leave-active{
  transition: all 0.4s cubic-bezier(.3,.5,.29,.99);
}
.trans-enter, .trans-leave-active{
  transform: translateX(-100%) translateZ(0);
}
</style>
