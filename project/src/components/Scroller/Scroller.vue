<template>
  <div style="position:relative;">
    <touch class="wrapper" @panmove="scroll" @panstart="touchStart" @panend="touchEnd">
      <div class="content" :class="{preventEvent: scrolling}">
        <transition name="fade" @enter="pullshow = true" @after-leave="pullshow = false">
          <div class="pull-refresh" v-if="canPullRefresh && (touching || pullRefreshState === 2)">
            <icon class="pull-refresh-icon" :name="refreshIcon" spin v-show="pullRefreshState === 2"></icon>
            <icon class="pull-refresh-icon" name="down" :class="{'active-pull-refresh-icon': pullRefreshState === 1}" v-show="pullRefreshState !== 2"></icon>
            <div class="pull-refresh-text">{{ _pullRefreshText }}</div>
          </div>
        </transition>
        <slot></slot>
        <div v-if="canLoadMore && !noMore && showLoading" class="loadmoreWrapper"><div class="loadmore"><icon class="loadmore-icon" :name="loadIcon" spin></icon>&nbsp&nbsp<span>{{loadmoreText}}</span></div></div>
      </div>
    </touch>
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
    },
    canLoadMore: {
      type: Boolean,
      default: false
    },
    loadIcon: {
      type: String,
      default: 'loading'
    },
    loadmoreText: {
      type: String,
      default: '加载中...'
    }
  },
  watch: {
    y: function (val, oldVal) {
      if (val === 0) {
        this.$emit('input', true)
      } else {
        this.$emit('input', false)
      }
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
    _pullRefreshText: function () {
      var texts = {
        0: this.pullRefreshText,
        1: this.activeRefreshText,
        2: this.refreshingText
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
      iscrollMounted: false,
      loadMoreHeigth: 60,
      noMore: false,
      pullshow: false,
      deactivated: false,
      showLoading: false
    }
  },
  mounted () {
    var options = {
      bounceTime: 1000,
      deceleration: 0.0006
    }
    if (this.canPullRefresh) {
      options.probeType = 1
    }
    this.iScroll = new IScroll(this.$el.childNodes[0], options)
    this.iScroll.on('scrollStart', this.scrollStart)
    this.iScroll.on('scrollEnd', this.scrollEnd)
    // this.iScroll.on('scroll', this.scroll)
    this.iScroll.on('beforeScrollStart', this.beforeScrollStart)
    this.iScroll.on('scrollCancel', this.scrollCancel)
    this.refresh()
    this.iscrollMounted = true
  },
  methods: {
    refresh () {
      if (!this.deactivated) {
        setTimeout(() => {
          var fix = {
            top: 0,
            bottom: 0
          }
          if (this.pullshow) {
            fix.bottom = this.pullRefreshHeight
          }
          if (this.pullRefreshState === 2) {
            fix.top = this.pullRefreshHeight
          }
          // console.log(fix)
          this.iScroll.refresh(fix)
          if (!this.iScroll.hasVerticalScroll) {
            this.showLoading = false
          }
          if (this.iScroll.hasVerticalScroll && !this.showLoading) {
            this.showLoading = true
            this.refresh()
          }
          this.iScroll.hasVerticalScroll = true
        }, 0)
      }
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
      if (this.canLoadMore && !this.noMore && this.iScroll.y <= this.iScroll.maxScrollY + this.loadMoreHeigth) {
        this.loadMore()
      }
      this.scroll()
      this.$emit('scrollEnd')
    },
    scrollTop () {
      if (this.pullRefreshState === 2) {
        this.scrollTo(0, -this.pullRefreshHeight)
      } else {
        this.scrollTo(0, 0)
      }
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
      setTimeout(() => {
        this.scrollTop()
      }, 0)
      this.$emit('pullRefresh', this.endPullRefresh)
    },
    endPullRefresh () {
      this.pullRefreshState = 0
      this.refresh()
    },
    loadMore () {
      if (!this.loading && this.showLoading) {
        this.loading = true
        this.$emit('loadMore', this.endLoadMore)
      }
    },
    endLoadMore (noMore) {
      if (noMore) {
        this.noMore = true
      }
      this.loading = false
      this.refresh()
    }
  },
  activated () {
    this.deactivated = false
    this.refresh()
  },
  deactivated () {
    this.deactivated = true
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
  text-align: center;
  padding-top: 8px;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: -60px;
  height: 60px;
  user-select: none;
  color: #7a8086;
}
.pull-refresh-icon,.loadmore-icon{
  width: 25px;
  height: 25px;
  transition: transform .4s;
}
.loadmore{
  /*align-self: center;*/
  font-size: 14px;
  color: #7a8086;
  height: 100%;
  display: flex;
  align-items: center;
}
.loadmoreWrapper{
  height:60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.active-pull-refresh-icon{
  transform: rotate(-180deg)
}
.pull-refresh-text{
  font-size: 12px;
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
