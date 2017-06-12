<template>
  <touch class="page" @panstart="panstart" @panend="panend" swipe @panleft="panHorizontal" @panright="panHorizontal" @pandown="panVertical" @panup="panVertical">
    <div style="height: 100%; width: 100%; position: relative">
      <transition name="remove" @before-leave="removing=true" @after-leave="tagend">
        <div v-if="paning" class="pull-tag" :style="{transform: 'translateY(' + (pullDistance<30?pullDistance:30) + 'px) translateZ(0)'}">{{tagMessage}}</div>
      </transition>
      <span  class="pull-tag-icon" :tag="tag" :active="activePull && !tag" :noactive="activePull && tag" :class="{trans: removing}" :style="{transform: 'translateY(' + (pullDistance<30?pullDistance:30) + 'px) translateZ(0)'}"><icon name="tag"></icon></span>
      <div class="content-wrapper" :class="{trans: !paning}" :style="{transform: 'translateY(' + pullDistance + 'px) translateZ(0)', background: pageColor, color: fontColor}">
        <span v-if="chapter" class="chapter">{{chapter}}</span>
        <div class="pageContent">
          <div class="pageContentWrapper" ref="content" :style="{'font-family': fontFamily,'font-size': fontSize + 'px'}">
            <slot></slot>
            <div v-if="data" :class="{noindent: !data.start}">
              <p v-for="(parts, index) in data.data">{{parts}}<span v-if="!data.end && index + 1 === data.data.length" style="display:inline-block; padding-left: 100%;"></span></p>
            </div>
          </div>
        </div>
        <span v-if="page" class="pageIndex">{{page}}</span>
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
    chapter: {
      type: String,
      default: ''
    },
    page: {
      type: [Number, String],
      default: ''
    },
    pageColor: {
      type: String,
      default: '#fff'
    },
    fontColor: {
      type: String,
      default: '#222'
    },
    fontSize: {
      type: Number,
      default: 14
    },
    fontFamily: {
      type: String,
      default: 'initial'
    },
    data: {
      type: Object,
      require: true
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
    },
    tag () {
      // return this.data.tag
      if (this.data !== undefined) {
        return this.data.tag
      } else {
        return false
      }
    }
  },
  methods: {
    panstart (e) {
      if (!this.removing) {
        // console.log('panstart')
        // e.srcEvent.stopImmediatePropagation()
        this.$emit('panstart')
        this.paning = true
        this.distanceYfix = e.deltaY
        this.distanceXfix = e.deltaX
      }
    },
    panVertical (e) {
      if (this.panDirection !== 'horizontal' && !this.removing && this.paning) {
        this.panDirection = 'vertical'
        if (this.canPullTag) {
          // e.srcEvent.stopImmediatePropagation()
          const distance = e.deltaY - this.distanceYfix > 0 ? e.deltaY - this.distanceYfix : 0
          this.pullDistance = bounce(distance)
        }
      }
    },
    panHorizontal (e) {
      if (this.panDirection !== 'vertical' && !this.removing && this.paning) {
        this.panDirection = 'horizontal'
        this.$emit('panHorizontal', e.deltaX - this.distanceXfix)
      }
    },
    panend (e) {
      this.panDirection = undefined
      if (this.canPullTag && !this.removing) {
        // e.srcEvent.stopImmediatePropagation()
        if (this.pullDistance > this.tagHeight) {
          if (this.tag) {
            this.$emit('untag', this.data)
          } else {
            this.$emit('tag', this.data)
          }
        }
        this.pullDistance = 0
        this.paning = false
        setTimeout(() => {
          this.$emit('panend')
        }, 0)
      }
    },
    tagend () {
      this.removing = false
      this.$emit('tagend')
    },
    getContentHeight () {
      return this.$refs.content.offsetHeight
    }
  },
  mounted () {
    console.log(this.data)
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
      margin: 40px 20px 25px 20px;
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
  transition: transform .4s cubic-bezier(.3,.5,.29,.99),color .2s,background .2s;
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
.pageContentWrapper{
  text-indent: 2em;
  text-align: justify;
  line-height: 1.8em;
  font-size: 16px;
  width: 100%;
  p {
    margin: 0;
    padding: 0;
  }
}
.noindent>:first-child{
  text-indent: 0em;
}

</style>
