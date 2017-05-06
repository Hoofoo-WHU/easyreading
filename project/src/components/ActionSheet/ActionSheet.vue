<template>
  <touch class="wrapper" @tap="cancel">
  </touch>
</template>
<script>
export default {
  name: 'ActionSheet',
  data () {
    return {

    }
  },
  methods: {
    cancel (e) {
      setTimeout(() => {
        this.$emit('cancel')
      }, 0)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper{
  z-index: 200;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #0006;
}
</style>
