<template>
<div>
  <pagination :all="all" v-model="cur"></pagination>
</div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'star',
  components: {
    Pagination
  },
  ready () {
    this.requestData()
  },
  data () {
    return {
      all: 8,
      cur: 1
    }
  },
  methods: {
    requestData () {
      // 在这里使用ajax或者fetch将对应页传过去获取数据即可
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
