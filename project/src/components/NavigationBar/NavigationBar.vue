<template>
<div class="navigation-bar border" :showborder="border" :class="{ios: $platform === 'ios'}" @touchend.prevent.stop="touchEnd" @mouseup.prevent.stop="touchEnd">
  <slot>
    <div class="left"><slot name="left"></slot></div>
    <div v-if="title" class="title" :class="{small: subTitle}">{{title}}</div>
    <div v-if="subTitle" class="title sub-title">{{subTitle}}</div>
    <div class="right"><slot name="right"></slot></div>
  </slot>
</div>
</template>

<script>
import InnerEvent from './mixins/innerEvent'
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
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  mixins: [InnerEvent],
  methods: {
    touchEnd: function (e) {
      if (this.isInnerEvent(e, this.$el)) {
        this.$emit('tap', e)
      }
    }
  }
  // computed: {
  //   routing: function () {
  //     if (this.$store && this.$store.getters.routing) {
  //       return this.$store.getters.routing
  //     }
  //     return false
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.navigation-bar{
  display: flex;
  width: 100%;
  flex-direction: row;
  z-index: 100;
  user-select: none;
  position: relative;
  min-height: 49px;
  // &[routing]{
  //   background: #fff
  // }
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
    white-space: nowrap;
  }
  .small{
    font-size: 15px;
  }
  .sub-title{
    top: 50%;
    transform: translate(-50%, 8px);
    font-size: 9px;
    white-space: nowrap;
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
.border:before { 
  opacity: 0;
  border-bottom: 1px solid #c8c7cc;
  content: '';
  width: 100%;
  position: absolute;
  bottom: 0;
  transform-origin: left bottom;
  transition: opacity .3s ease;
}
.border[showborder]:before{
  opacity: 1;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.0),
only screen and (min--moz-device-pixel-ratio: 2.0),
only screen and (-o-min-device-pixel-ratio: 200/100),
only screen and (min-device-pixel-ratio: 2.0) {
  .border:before {
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.5),
only screen and (min--moz-device-pixel-ratio: 2.5),
only screen and (-o-min-device-pixel-ratio: 250/100),
only screen and (min-device-pixel-ratio: 2.5) {
  .border:before {
    transform: scaleY(0.4);
  }
}
// .border { border-bottom: 1px solid #c8c7cc }
// @media screen and (-webkit-min-device-pixel-ratio: 2) {
//   .border { border-bottom: 0.5px solid #c8c7cc }
// }
// @media screen and (-webkit-min-device-pixel-ratio: 3) {
//   .border { border-bottom: 0.333333px solid #c8c7cc }
// }
@supports not (-webkit-backdrop-filter: blur(8px)){
  .navigation-bar{
    background: #fff;
  }
}
@supports (-webkit-backdrop-filter: blur(8px)){
  .navigation-bar{
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }
}
</style>
