<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'my',
  data () {
    return {
      msg: '这里是我的模块'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
