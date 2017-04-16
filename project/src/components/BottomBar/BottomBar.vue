<template>
<touch class="bottom-bar border">
  <slot></slot>
</touch>
</template>

<script>
export default {
  name: 'BottomBar',
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.bottom-bar{
  min-height: 49px;
  display: flex;
  width: 100%;
  flex-direction: row;
  z-index: 1;
}
@supports not (-webkit-backdrop-filter: blur(8px)){
  .bottom-bar{
    background: #fff;
  }
}
@supports (-webkit-backdrop-filter: blur(8px)){
  .bottom-bar{
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
  }
}
.border { border-top: 1px solid #c8c7cc }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border { border-top: 0.5px solid #c8c7cc }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border { border-top: 0.333333px solid #c8c7cc }
}
</style>
