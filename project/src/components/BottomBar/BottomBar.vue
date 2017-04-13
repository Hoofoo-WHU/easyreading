<template>
<div class="bottom-bar">
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
</style>
