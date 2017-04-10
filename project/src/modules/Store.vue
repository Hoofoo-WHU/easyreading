<template>
  <scroller class="scroller" ref="scroller">
    <div>
      {{ msg }}
    </div>
  </scroller>
</template>

<script>
import Scroller from '@/components/Scroller'
export default {
  name: 'store',
  data () {
    return {
      msg: '这里是商城模块'
    }
  },
  components: {
    Scroller
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
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
