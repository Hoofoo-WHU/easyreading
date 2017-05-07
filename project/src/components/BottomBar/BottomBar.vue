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
  z-index: 100;
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
.border:before { 
  border-top: 1px solid #c8c7cc;
  content: '';
  width: 100%;
  position: absolute;
  transform-origin: left top;
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
