<template>
  <touch class="colorBlock" :class="{border: border}" :active="active" :style="{background: color}" @tap="tap">
    <slot></slot>
  </touch>
</template>
<script>
export default {
  name: 'ColorBlock',
  props: {
    color: {
      type: String,
      required: true
    },
    border: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    tap: function () {
      this.$emit('tap')
    }
  }
}
</script>
<style lang="stylus" scoped>
.colorBlock{
  border-radius: 4px;
  box-sizing: border-box;
  &[class*=border]{
    border: 1px solid #ccc;
  }
  &[active]{
    border: 1px solid #157afb;
  }
}
</style>
