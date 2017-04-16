<template>
<touch @tap="login">登录</touch>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {

    }
  },
  methods: {
    login () {
      console.log('Tap login')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
