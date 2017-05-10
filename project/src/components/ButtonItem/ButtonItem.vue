<template>
  <touch class="buttonItem" :deactive="paning" @tap="tap" @panstart="panstart" @panend="panend" :pan-options="{direction: 'vertical'}" :tap-options="{threshold: 99999999,time: 99999999}">
    <slot></slot>
  </touch>
</template>

<script>
import InnerEvent from './mixins/innerEvent'
export default {
  name: 'ButtonItem',
  data () {
    return {
      paning: false
    }
  },
  computed: {
    height () {
      return parseInt(getComputedStyle(this.$el).height)
    }
  },
  mixins: [InnerEvent],
  methods: {
    panstart () {
      this.paning = true
    },
    panend () {
      setTimeout(() => {
        this.paning = false
      }, 0)
    },
    tap (e) {
      if (!this.paning && this.isInnerEvent(e.srcEvent, this.$el)) {
        this.$emit('tap')
      }
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
  &:active{
    background: rgba(0,0,0,0.031);
  }
  &[deactive]{
    background: none;
  }
}
</style>
