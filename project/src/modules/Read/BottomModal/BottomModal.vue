<template>
  <div :class="{show: show}" class="bottomModal border">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BottomModal',
  props: {
    show: {
      type: Boolean,
      default: 'false'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.bottomModal{
  position: absolute;
  bottom: 49px;
  height: 106px;
  left: 0;
  right: 0;
  z-index: 99;
  transform: translateY(155px);
  transition: transform .3s;
  // padding: 0 2em;
  &[class*=show]{
    transform: translateY(0)
  }
  &[class*=border]:before { 
    border-top: 1px solid #c8c7cc;
    content: '';
    left: 0;
    right: 0;
    position: absolute;
    transform-origin: left top;
  }
}
@supports not (-webkit-backdrop-filter: blur(8px)){
  .bottomModal{
    background: #fff;
  }
}
@supports (-webkit-backdrop-filter: blur(8px)){
  .bottomModal{
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }
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
</style>
