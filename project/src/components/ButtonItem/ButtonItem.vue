<template>
  <div class="buttonItem" @touchend.prevent.stop="touchEnd" @mouseup.prevent.stop="touchEnd">
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

    }
  },
  mixins: [InnerEvent],
  methods: {
    touchEnd (e) {
      if (this.isInnerEvent(e, this.$el)) {
        this.$emit('tap')
      }
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
  &:active{
    background: #00000008;
  }
  .content{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3D(-50%, -50%, 0)
  }
}
</style>
