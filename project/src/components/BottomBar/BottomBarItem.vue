<template>
  <div class="bottom-bar-item" :class="{active: active, disable: disable}">
    <icon class="icon" v-if="icon" :class="{only: !text}" :name="icon"></icon>
    <div class="text" :class="{only: !icon}" v-if="text">{{ text }}</div>
  </div>
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
    }
  },
  components: {
    Icon
  },
  data () {
    return {

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
  .icon{
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -18px);
    &[class*=only]{
      position: static;
      transform: translate(0, 0);
      flex: 1;
      align-self: center;
    }
  }
  .text{
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 8px);
    &[class*=only]{
      position: static;
      text-align: center;
      transform: translate(0, 0);
      flex: 1;
      align-self: center;
      font-size: 17px;
    }
  }
}
.active{
  color: #157afb;
}
.disable{
  pointer-events: none;
  color: #c7c7cc;
}
</style>
