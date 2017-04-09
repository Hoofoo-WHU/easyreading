<template>
  <scroll style="overflow: scroll; flex: 1; -webkit-overflow-scrolling: touch;">
    <div style="height: 2000px; background: -webkit-linear-gradient(red, blue); width: 90%;"></div>
  </scroll>
</template>

<script>
import Scroll from './scroll.vue'
export default {
  name: 'store',
  data () {
    return {
      msg: '这里是商城模块'
    }
  },
  components: {
    Scroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
