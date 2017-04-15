<template>
  <div class="bottom-bar-item" :class="{active: active, disable: disable}">
    <icon class="icon" v-if="icon" :class="{only: !text}" :name="icon"></icon>
    <div class="name" :class="{only: !icon}" v-if="text">{{ text }}</div>
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
  height: 49px;
  flex: 1;
  display: flex;
  user-select: none;
  color: #5a6773;
  transition: color .3s;
  position: relative;
  .icon{
    width: 25px;
    height: 25px;
    margin: 7px auto 0px auto;
    &[class*=only]{
      flex: 1;
      margin: 0;
      align-self: center;
    }
  }
  .name{
    font-size: 10px;
    position: absolute;
    bottom: 1.5px;
    left: 50%;
    transform: translate(-50%, 0);
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
