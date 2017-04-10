<template>
  <div class="wrapper" @touchmove.prevent @click.prevent>
    <div class="content" :class="{preventEvent: scrolling}">
      <!-- <div>{{x}},{{y}}</div> -->
      <!-- <div>{{ scrolling }}</div> -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll'
export default {
  name: 'vue-iscroll',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          bounceTime: 1000,
          deceleration: 0.00055
        }
      }
    }
  },
  watch: {
    options: {
      handler: function (val, oldVal) {
        this.iScroll.options = val
      },
      deep: true
    }
  },
  data () {
    return {
      iScroll: undefined,
      scrolling: false
    }
  },
  computed: {
    x: function () {
      return this.iScroll ? this.iScroll.x : 0
    },
    y: function () {
      return this.iScroll ? this.iScroll.y : 0
    }
  },
  mounted () {
    this.iScroll = new IScroll(this.$el, this.options)
    this.iScroll.on('scrollStart', this.scrollStart)
    this.iScroll.on('scrollEnd', this.scrollEnd)
    setTimeout(this.resize, 0)
  },
  methods: {
    resize () {
      this.iScroll.refresh()
      this.iScroll.hasVerticalScroll = true
    },
    scrollStart () {
      this.scrolling = true
      this.$emit('scrollStart')
    },
    scrollEnd () {
      this.scrolling = false
      this.$emit('scrollEnd')
    },
    scrollTop () {
      this.iScroll.scrollTo(0, 0, 1000)
    }
  }
}
</script>

<style lang="css" scoped>
.wrapper{
  overflow: hidden !important;
}
.content{
  overflow: hidden;
}
.preventEvent{
  pointer-events: none;
}
</style>
