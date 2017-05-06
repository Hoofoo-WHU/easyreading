<template>
  <touch class="page" @panstart="panstart" @panend="panend" :pan-options="{ direction: 'vertical' }" @panmove="panVertival">
    <div style="height: 100%; width: 100%; position: relative">
      <transition name="remove" @before-leave="removing=true" @after-leave="tagend">
        <div v-if="paning" class="pull-tag" :style="{transform: 'translateY(' + (pullDistance<30?pullDistance:30) + 'px) translateZ(0)'}">{{tagMessage}}</div>
      </transition>
      <span  class="pull-tag-icon" :tag="tag" :active="activePull && !tag" :noactive="activePull && tag" :class="{trans: removing}" :style="{transform: 'translateY(' + (pullDistance<30?pullDistance:30) + 'px) translateZ(0)'}"><icon name="tag"></icon></span>
      <div class="content-wrapper" :class="{trans: !paning}" :style="{transform: 'translateY(' + pullDistance + 'px) translateZ(0)'}">
        <transition name="fade" appear>
          <span v-if="chapter" class="chapter">{{chapter}}</span>
        </transition>
        <div class="pageContent">
          <slot></slot>
        </div>
        <transition name="fade" appear>
          <span v-if="page" class="pageIndex">{{page}}</span>
        </transition>
      </div>
    </div>
  </touch>
</template>

<script>
import Icon from '@/components/Icon'
import bounce from '../lib/bounce.js'
export default {
  name: 'page',
  components: {
    Icon
  },
  props: {
    canPullTag: {
      type: Boolean,
      default: false
    },
    tag: {
      type: Boolean,
      default: false
    },
    chapter: {
      type: String,
      default: ''
    },
    page: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      paning: false,
      pullDistance: 0,
      tagHeight: 60,
      removing: false
    }
  },
  computed: {
    tagMessage () {
      if (this.activePull) {
        return !this.tag ? '松手添加书签' : '松手删除书签'
      } else {
        return !this.tag ? '下拉添加书签' : '下拉删除书签'
      }
    },
    activePull () {
      return this.pullDistance > this.tagHeight
    }
  },
  methods: {
    panstart (e) {
      if (this.canPullTag && !this.removing) {
        // console.log('panstart')
        // e.srcEvent.stopImmediatePropagation()
        this.paning = true
        this.distancefix = e.deltaY
        this.$emit('tagstart')
      }
    },
    panVertival (e) {
      if (this.canPullTag && !this.removing && this.paning) {
        e.srcEvent.stopImmediatePropagation()
        const distance = e.deltaY - this.distancefix > 0 ? e.deltaY - this.distancefix : 0
        this.pullDistance = bounce(distance)
      }
    },
    panend (e) {
      if (this.canPullTag && !this.removing) {
        e.srcEvent.stopImmediatePropagation()
        if (this.pullDistance > this.tagHeight) {
          if (this.tag) {
            this.$emit('untag')
          } else {
            this.$emit('tag')
          }
        }
        this.pullDistance = 0
        this.paning = false
      }
    },
    tagend () {
      this.removing = false
      this.$emit('tagend')
    }
  }
}
</script>

<style lang="stylus" scoped>
.page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .content-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: -1;
    // transform: translateZ(0);
    display: flex;
    .chapter{
      position: absolute;
      font-size: 12px;
      opacity: 0.5;
      top: 15px;
      left: 20px;
      right: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .pageIndex{
      position: absolute;
      bottom: 15px;
      right: 20px;
      opacity: 0.5;
      font-size: 12px;
    }
    .pageContent{
      display: flex;
      flex: 1;
      margin: 40px 20px 40px 20px;
      overflow: hidden;
    }
    // z-index: 0;
  }
}
.pull-tag{
  position: absolute;
  height: 30px;
  top: -30px;
  font-size: 14px;
  line-height: 30px;
  right: 30px;
  color: #888;
  // transform: translateZ(0);
  // text-align: bottom;
}
.pull-tag-icon{
  position: absolute;
  width: 30px;
  height: 30px;
  top: -30px;
  right: 0;
  color: #888;
  // z-index: 1;
  // transform: translateZ(0);
  transition: color .4s;
  &[tag]{
    color: #db5149;
    transform: translateY(30px) !important;
    // z-index: 1;
  }
  &[active]{
    color: #db5149;
  }
  &[noactive]{
    color: #888;
  }
}
.trans{   
  transition: transform .4s cubic-bezier(.3,.5,.29,.99),color .4s;
}
.remove-leave-active {
  transform: translateY(0) !important;
  transition: transform .4s cubic-bezier(.3,.5,.29,.99);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
