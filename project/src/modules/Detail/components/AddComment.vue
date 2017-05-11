<template lang="html">
    <transition name="add-comment-show">
    <div id="add-comment" v-show="show">
        <navigation-bar @tap="scrollTop" title="发表书评">
          <navigation-bar-item slot="left" text="取消" @tap="back"/>
          <navigation-bar-item @tap="confirm" slot="right" text="确定"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller">
            <div class="point">
                <touch class="star" v-for="star in sort(stars)" @tap="mark(star.score)" >
                    <icon class="icon" name="light-star" v-show="star.light">
                    </icon>
                    <icon class="icon" name="dark-star" v-show="!star.light">
                    </icon>
                </touch>

            </div>
            <div class="content">
                <textarea name="name" rows="22" placeholder="我的评论" v-model="commentContent"></textarea>
            </div>
        </scroller>
    </div>
    </transition>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Scroller from '@/components/Scroller'
import Icon from '@/components/Icon'
export default {
  name: 'addComment',
  components: {
    NavigationBar,
    NavigationBarItem,
    Scroller,
    Icon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    back () {
      this.show = false
    },
    confirm () {
      this.show = false
    },
    sort (arr) {
      return arr.slice().sort((item1, item2) => { return item1.score - item2.score })
    },
    mark (score) {
      for (let i = 0; i < this.stars.length; i++) {
        if (this.stars[i].score <= score) {
          this.stars[i].light = true
        } else {
          this.stars[i].light = false
        }
      }
    }
  },
  watch: {
    value (val) {
      this.show = val
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    show (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      stars: [],
      show: false,
      commentContent: ''
    }
  },
  mounted () {
    this.stars = [
      {score: 1, name: 'star', light: false},
      {score: 2, name: 'star', light: false},
      {score: 3, name: 'star', light: false},
      {score: 4, name: 'star', light: false},
      {score: 5, name: 'star', light: false}
    ]
  }

}
</script>

<style lang="stylus" scoped>
#add-comment {
    width: 100%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
    z-index: 100000000;
}
.point {
    margin: 10px 0;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    border-bottom: 1px #d3d3d3 solid;
    .star {
        width: 10%;
        margin: 0 10px;
    }
}
.content {
    width: 90%
    margin: 0 auto;
    textarea {
        width: 100%;
        font-size: 14px;
        border: none;
        outline: none;
        overflow:visible;
        resize: none;
        height: 400px;
    }
}
.add-comment-show-enter-active, .add-comment-show-leave-active {
    transition: transform .3s
}
.add-comment-show-enter {
    transform: translateY(100%);
}
.add-comment-show-leave-to {
    transform: translateY(100%);
}

</style>
