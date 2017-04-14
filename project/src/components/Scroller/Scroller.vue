<template>
  <div class="wrapper" @touchmove.prevent @touchstart="touchStart" @touchend="touchEnd" @mousedown="touchStart" @mouseup="touchEnd">
    <div class="content" :class="{preventEvent: scrolling}">
        <div class="pull-refresh" v-if="canPullRefresh" :class="{ opacity1: touching || pullRefreshState === 2 }">
          <icon class="pull-refresh-icon" :name="refreshIcon" spin v-if="pullRefreshState === 2"></icon>
          <icon class="pull-refresh-icon" name="up" :class="{'active-pull-refresh-icon': pullRefreshState === 1}" v-if="pullRefreshState !== 2"></icon>
          <div class="pull-refresh-text">{{ pullRefreshText }}</div>
        </div>
<!--       <div>{{x}},{{y}}</div>
      <div>{{ scrolling }}</div>
      <div>{{ pullRefreshState }}</div>
 -->      
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IScroll from './lib/iscroll-probe'
import Icon from '@/components/Icon'
export default {
  name: 'vue-iscroll',
  components: {
    Icon
  },
  props: {
    canPullRefresh: {
      type: Boolean,
      default: false
    },
    refreshingText: {
      type: String,
      default: '加载中...'
    },
    pullRefreshText: {
      type: String,
      default: '下拉刷新'
    },
    activeRefreshText: {
      type: String,
      default: '释放刷新'
    },
    refreshIcon: {
      type: String,
      default: 'loading'
    }
  },
  watch: {
    y: function (val, oldVal) {
      if (this.canPullRefresh && this.pullRefreshState !== 2) {
        if (val > this.pullRefreshHeight) {
          this.pullRefreshState = 1
        } else {
          this.pullRefreshState = 0
        }
      }
    }
  },
  computed: {
    pullRefreshText: function () {
      var texts = {
        0: '下拉刷新',
        1: '释放更新',
        2: '加载中...'
      }
      return texts[this.pullRefreshState]
    }
  },
  data () {
    return {
      iScroll: undefined,
      scrolling: false,
      pullRefreshState: 0, // 0 下拉刷新，1 激活， 2 refreshing
      x: 0,
      y: 0,
      pullRefreshHeight: 60,
      touching: false
    }
  },
  mounted () {
    var options = {
      bounceTime: 1000,
      deceleration: 0.00055
    }
    if (this.canPullRefresh) {
      options.probeType = 3
    }
    this.iScroll = new IScroll(this.$el, options)
    this.iScroll.on('scrollStart', this.scrollStart)
    this.iScroll.on('scrollEnd', this.scrollEnd)
    this.iScroll.on('scroll', this.scroll)
    this.iScroll.on('beforeScrollStart', this.beforeScrollStart)
    this.refresh()
  },
  methods: {
    refresh () {
      setTimeout(() => {
        var fix = {
          top: 0,
          bottom: this.pullRefreshHeight
        }
        if (this.canPullRefresh && this.pullRefreshState === 2) {
          fix.top = this.pullRefreshHeight
        }
        this.iScroll.refresh(fix)
        this.iScroll.hasVerticalScroll = true
      }, 0)
    },
    beforeScrollStart () {
      this.$emit('beforeScrollStart')
    },
    scrollStart () {
      this.scrolling = true
      this.$emit('scrollStart')
    },
    scroll () {
      this.x = ~~this.iScroll.x
      this.y = ~~this.iScroll.y
      console.log(this.touching || this.pullRefreshState === 2)
    },
    scrollEnd () {
      this.scrolling = false
      this.$emit('scrollEnd')
    },
    scrollTop () {
      this.iScroll.scrollTo(0, 0, 1000)
    },
    scrollTo (x, y) {
      this.iScroll.scrollTo(-x, -y, 1000)
    },
    scrollBy (x, y) {
      this.iScroll.scrollBy(-x, -y, 1000)
    },
    touchStart () {
      this.touching = true
    },
    touchEnd () {
      console.log('touchEnd')
      this.touching = false
      if (this.canPullRefresh && this.pullRefreshState === 1) {
        this.activePullRefresh()
      }
    },
    activePullRefresh () {
      this.pullRefreshState = 2
      this.refresh()
      this.$emit('pullRefresh', this.endPullRefresh)
    },
    endPullRefresh () {
      this.pullRefreshState = 0
      this.refresh()
    }
  }
}
</script>

<style lang="css" scoped>
.wrapper{
  overflow: hidden !important;
}
.content{
  overflow: visible;
}
.pull-refresh{
  padding-top: 8px;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: -60px;
  height: 60px;
  transition: opacity .4s;
  opacity: 0;
}
.pull-refresh-icon{
  width: 25px;
  height: 25px;
  color: #7a8086;
  transition: transform .4s;
}
.active-pull-refresh-icon{
  transform: rotate(-180deg)
}
.pull-refresh-text{
  font-size: 12px;
  color: #7a8086;
}
.preventEvent{
  pointer-events: none;
}
.opacity1{
  transition: opacity 0s;
  opacity: 1;
}

</style>
