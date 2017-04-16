<template>
<div class="navigation-bar border" :class="{ios: $platform === 'ios'}">
  <slot>
    <div class="left"><slot name="left"></slot></div>
    <div v-if="title" class="title" :class="{small: subTitle}">{{title}}</div>
    <div v-if="subTitle" class="title sub-title">{{subTitle}}</div>
    <div class="right"><slot name="right"></slot></div>
  </slot>
</div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.navigation-bar{
  display: flex;
  width: 100%;
  flex-direction: row;
  z-index: 1;
  user-select: none;
  position: relative;
  min-height: 49px;
  .title{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 17px;
    color: #030303;
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .small{
    font-size: 15px;
  }
  .sub-title{
    top: 50%;
    transform: translate(-50%, 6px);
    font-size: 11px;
  }
  .left{
    display: flex;
  }
  .right{
    margin-left: auto;
    display: flex;
  }
}
.ios{
  padding-top: 20px;
  & > .title{
    margin-top: 10px;
  }
}
.border { border-bottom: 1px solid #c8c7cc }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border { border-bottom: 0.5px solid #c8c7cc }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border { border-bottom: 0.333333px solid #c8c7cc }
}
@supports not (-webkit-backdrop-filter: blur(8px)){
  .navigation-bar{
    background: #fff;
  }
}
@supports (-webkit-backdrop-filter: blur(8px)){
  .navigation-bar{
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
  }
}
</style>
