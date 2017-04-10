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
  name: 'search',
  components: {
    Scroller
  },
  data () {
    return {
      msg: '这里是搜索模块'
    }
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

