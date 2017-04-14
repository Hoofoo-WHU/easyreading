<template>
<div class="bottom-bar border">
  <slot></slot>
</div>
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
  height: 49px;
  display: flex;
  width: 100%;
  flex-direction: row;
  background: #fafafa;
}
.border { border-top: 1px solid #c8c7cc }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border { border-top: 0.5px solid #c8c7cc }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border { border-top: 0.333333px solid #c8c7cc }
}
</style>
