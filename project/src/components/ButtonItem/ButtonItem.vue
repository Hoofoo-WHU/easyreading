<template>
  <div class="buttonItem" :active="touch" @touchstart.prevent="touchStart" @mousedown.prevent="touchStart" @touchend.prevent="touchEnd" @mouseup.prevent="touchEnd">
    <slot></slot>
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
  min-height: 5px;
  overflow: hidden;
  user-select: none;
  position: relative;
  transition: all .3s ease;
  &[active]{
    background: rgba(0,0,0,0.031);
  }
}
</style>
