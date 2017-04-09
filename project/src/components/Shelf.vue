<template>
  <scroller class="scroller">
    <div>
      {{ msg }}
    </div>
  </scroller>
</template>

<script>
import Scroller from './vue-iscroll.vue'
export default {
  name: 'shelf',
  components: {
    Scroller
  },
  data () {
    return {
      msg: '这里是书架模块'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller{
  flex: 1;
}
</style>
