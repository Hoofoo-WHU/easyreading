<template>
  <scroller class="scroller">
    <div>
      {{ msg }}
    </div>
  </scroller>
</template>

<script>
import Scroller from '@/components/Scroller'
export default {
  name: 'my',
  components: {
    Scroller
  },
  data () {
    return {
      msg: '这里是我的模块'
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
