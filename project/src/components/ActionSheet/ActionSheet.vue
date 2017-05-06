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
    cancel () {
      this.$emit('cancel')
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
  transition: all .6s;
}
</style>
