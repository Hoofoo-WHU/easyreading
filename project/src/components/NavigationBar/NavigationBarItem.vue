<template>
  <div class="nav-bar-item" :class="{'right-icon': rightIcon, disable: disable}">
    <icon class="icon" v-if="icon" :name="icon"></icon>
    <span>{{text}}</span>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'NavigationBarItem',
  components: {
    Icon
  },
  props: {
    icon: String,
    text: {
      type: String,
      default: 'navigation-bar-item'
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
  }
}
</script>

<style lang="stylus" scoped>
.nav-bar-item{
  height: 49px;
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
