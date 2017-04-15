<template>
<div class="navigation-bar border" :class="{ios: $platform === 'ios'}">
  <slot>
    <div class="left"><slot name="left"></slot></div>
    <div class="title">{{title}}</div>
    <div class="right"><slot name="right"></slot></div>
  </slot>
</div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    title: String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.navigation-bar{
  height: 49px;
  display: flex;
  width: 100%;
  flex-direction: row;
  z-index: 1;
  user-select: none;
  position: relative;
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
.title{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  line-height: 49px;
  font-size: 17px;
  color: #030303;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left{
  display: flex;
}
.right{
  margin-left: auto;
  display: flex;
}
.ios{
  padding-top: 20px;
}
.border { border-bottom: 1px solid #c8c7cc }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border { border-bottom: 0.5px solid #c8c7cc }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border { border-bottom: 0.333333px solid #c8c7cc }
}
</style>
