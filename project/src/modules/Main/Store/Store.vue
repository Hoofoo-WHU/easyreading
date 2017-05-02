<template>
  <router-content>
    <scroller class="scroller" ref="scroller">
      <div style="text-align: center">
        {{ msg }}
      </div>
    </scroller>
  </router-content>
</template>

<script>
import RouterContent from '@/components/RouterContent'
import Scroller from '@/components/Scroller'
export default {
  name: 'store',
  data () {
    return {
      msg: '这里是商城模块'
    }
  },
  components: {
    Scroller,
    RouterContent
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
