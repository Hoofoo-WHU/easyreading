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
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
export default {
  name: 'shelf',
  components: {
    Scroller,
    RouterContent
  },
  data () {
    return {
      msg: '这里是书架模块'
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
