<template>
  <div class="buttonItem" :active="touch" @touchstart.prevent.stop="touchStart" @mousedown.prevent.stop="touchStart" @touchend.prevent.stop="touchEnd" @mouseup.prevent.stop="touchEnd">
    <span class="content">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import InnerEvent from './mixins/innerEvent'
export default {
  name: 'ButtonItem',
  data () {
    return {
      touch: false
    }
  },
  mixins: [InnerEvent],
  methods: {
    touchStart (e) {
      this.touch = true
    },
    touchEnd (e) {
      if (this.isInnerEvent(e, this.$el) && this.touch) {
        this.$emit('tap')
      }
      this.touch = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.buttonItem{
  width: 100%;
  height: 53px;
  overflow: hidden;
  user-select: none;
  position: relative;
  transition: all .3s ease;
  &[active]{
    background: rgba(0,0,0,0.031);
  }
  .content{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3D(-50%, -50%, 0)
  }
}
</style>
