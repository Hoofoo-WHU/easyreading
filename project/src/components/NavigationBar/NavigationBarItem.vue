<template>
  <div class="nav-bar-item" :class="{'right-icon': rightIcon, disable: disable}" @touchend.prevent.stop="touchEnd" @mouseup.prevent.stop="touchEnd">
    <icon class="icon" v-if="icon" :name="icon" :only="!text"></icon>
    <span v-if="text">{{text}}</span>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import InnerEvent from './mixins/innerEvent'
export default {
  name: 'NavigationBarItem',
  components: {
    Icon
  },
  mixins: [InnerEvent],
  props: {
    icon: String,
    text: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    touchEnd: function (e) {
      if (this.isInnerEvent(e, this.$el)) {
        this.$emit('tap')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-bar-item{
  min-height: 49px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  color: #157afb;
  align-items: center;
  padding: 0px 10px;
  font-size: 17px;
  transition: color .3s;
  user-select: none;
  &:active{
    color: #c7c7cc;
  }
  .icon{
    width: 25px;
    height: 25px;
    &[only]{
      width: 39px;
      height: 25px;
    }
  }
  .right-icon{
    flex-direction: row-reverse;
  }
}
.disable{
  pointer-events: none;
  color: #c7c7cc;
}
</style>
