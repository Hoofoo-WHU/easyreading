<template>
  <touch class="bottom-bar-item" :class="{active: active, disable: disable}" @tap="tap">
      <span class="icon" v-if="icon" :class="{only: !text, badge: badge}">
        <icon :name="icon"></icon>
      </span>
      <div class="text" :class="{only: !icon, badge: badge}" v-if="text">{{ text }}</div>
    </div>
  </touch>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'BottomBarItem',
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: String,
    active: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    badge: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon
  },
  data () {
    return {
    }
  },
  methods: {
    tap: function (e) {
      // e.srcEvent.stopPropagation()
      e.srcEvent.stopImmediatePropagation()
      this.$emit('tap')
    }
  }
}
</script>

<style lang="stylus" scoped>
.bottom-bar-item{
  min-height: 49px;
  flex: 1;
  display: flex;
  user-select: none;
  color: #5a6773;
  transition: color .3s;
  position: relative;
  transform: opacity .2s ease;
  &[left-divide]:before{
    content: ''
    position: absolute;
    top: 13px;
    bottom: 13px;
    left: -1px;
    border-left: 1px solid #5a6773;
    opacity: 0.2;
  }
  &[right-divide]:after{
    content: ''
    position: absolute;
    top: 13px;
    bottom: 13px;
    right: 0;
    border-left: 1px solid #5a6773;
    opacity: 0.2;
  }
  .icon{
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -18px);
    &[class*=only]{
      transform: translate(-50%, -50%);
    }
    &[class*=badge]:before{
      content: '';
      width: 8px;
      height: 8px;
      position: absolute;
      top: 0;
      right: -4px;
      border-radius: 50%;
      background-color: #fe3824;
    }
  }
  .text{
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 8px);
    &[class*=only]{
      transform: translate(-50%, -50%);
      font-size: 14px;
      &[class*=badge]:before{
        content: '';
        width: 8px;
        height: 8px;
        position: absolute;
        top: 0;
        right: -4px;
        border-radius: 50%;
        background-color: #fe3824;
      }
    }
  }
}
.active{
  color: #157afb;
}
.disable{
  pointer-events: none;
  opacity: 0.5 !important;
}
</style>
