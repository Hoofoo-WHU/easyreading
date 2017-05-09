<template>
  <touch v-on:tap="toggle"><icon :name="iconname" class="icon"></icon></touch>
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
    toggle: function () {
      this.$emit('tap')
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
  height: 20px;
}
</style>
