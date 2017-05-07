<template>
  <touch class="item">
    <slot></slot>
  </touch>
</template>
<script>
export default {
  name: 'ActionSheetContent',
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.item{
  min-height: 1px;
  position: relative;
  &:before{
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    border-bottom: 1px solid #c8c7cc;
    transform-origin: left top;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.0),
only screen and (min--moz-device-pixel-ratio: 2.0),
only screen and (-o-min-device-pixel-ratio: 200/100),
only screen and (min-device-pixel-ratio: 2.0) {
  .item:before {
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.5),
only screen and (min--moz-device-pixel-ratio: 2.5),
only screen and (-o-min-device-pixel-ratio: 250/100),
only screen and (min-device-pixel-ratio: 2.5) {
  .item:before {
    transform: scaleY(0.4);
  }
}
</style>
