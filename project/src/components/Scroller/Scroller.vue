<template>
  <div style="position:relative;">
    <div class="wrapper" @touchmove.prevent @touchstart="touchStart" @touchend="touchEnd" @mousedown="touchStart" @mouseup="touchEnd">
      <div class="content" :class="{preventEvent: scrolling}">
        <transition name="fade">
          <div class="pull-refresh" v-if="!iscrollMounted || (canPullRefresh && (touching || pullRefreshState === 2))">
            <icon class="pull-refresh-icon" :name="refreshIcon" spin v-if="pullRefreshState === 2"></icon>
            <icon class="pull-refresh-icon" name="down" :class="{'active-pull-refresh-icon': pullRefreshState === 1}" v-if="pullRefreshState !== 2"></icon>
            <div class="pull-refresh-text">{{ pullRefreshText }}</div>
          </div>
        </transition>
  <!--       <div>{{x}},{{y}}</div>
        <div>{{ scrolling }}</div>
        <div>{{ pullRefreshState }}</div>
   -->      
        <slot></slot>
      </div>
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
      touching: false,
      iscrollMounted: false
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
    this.iScroll = new IScroll(this.$el.childNodes[0], options)
    this.iScroll.on('scrollStart', this.scrollStart)
    this.iScroll.on('scrollEnd', this.scrollEnd)
    this.iScroll.on('scroll', this.scroll)
    this.iScroll.on('beforeScrollStart', this.beforeScrollStart)
    this.refresh()
    this.iscrollMounted = true
  },
  methods: {
    refresh () {
      setTimeout(() => {
        var fix = {
          top: 0,
          bottom: this.pullRefreshHeight
        }
        if (this.pullRefreshState === 2) {
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
  overflow: visible !important;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
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
  user-select: none;
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
  user-select: none;
}
.preventEvent{
  pointer-events: none;
}
.fade-enter-active {
  transition: transform .8s, opacity .8s;
}
.fade-leave-active {
  transition: transform .8s, opacity .8s;
}
.fade-enter, .fade-leave-active {
  transform: scale(0.6, 0.6);
  opacity: 0;
}

</style>
