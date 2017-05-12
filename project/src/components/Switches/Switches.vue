<template>
  <touch v-on:tap="toggle" @touchstart.stop.prevent.native @touchend.stop.prevent.native @mouseup.stop.prevent.native @mousedown.stop.prevent.native class="switches"><icon :name="iconname" class="icon"></icon></touch>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'switches',
  components: {
    Icon
  },
  data () {
    return {
    }
  },
  methods: {
    toggle: function (e) {
      this.stop(e)
      this.$emit('tap')
    },
    stop (e) {
      e.srcEvent.stopImmediatePropagation()
    }
  },
  computed: {
    iconname: function () {
      return this.on ? 'switch-on' : 'switch-off'
    }
  },
  props: {
    on: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style scoped>
.icon{
  width: 40px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.switches{
  height: 100%;
  position: relative;
  width: 40px;
}
</style>
