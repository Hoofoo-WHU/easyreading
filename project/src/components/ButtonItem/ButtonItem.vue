<template>
  <touch class="buttonItem" :deactive="paning" @tap="tap" @panmove="panmove" @panend="panend" :pan-options="{threshold: 9}" :tap-options="{threshold: 99999999,time: 99999999}">
    <slot></slot>
  </touch>
</template>

<script>
import InnerEvent from './mixins/innerEvent'
export default {
  name: 'ButtonItem',
  data () {
    return {
      paning: false,
      oldTop: 0
    }
  },
  computed: {
    height () {
      return parseInt(getComputedStyle(this.$el).height)
    }
  },
  mixins: [InnerEvent],
  methods: {
    panmove (e) {
      if (this.$el.getBoundingClientRect().top !== this.oldTop) {
        this.oldTop = this.$el.getBoundingClientRect().top
        this.paning = true
      }
      if (!this.isInnerEvent(e.srcEvent, this.$el)) {
        this.paning = true
      }
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
  },
  mounted () {
    this.oldTop = this.$el.getBoundingClientRect().top
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
