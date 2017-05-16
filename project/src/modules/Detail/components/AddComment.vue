<template lang="html">
    <transition name="add-comment-show">
    <div id="add-comment" v-show="show">
        <navigation-bar title="发表书评">
          <navigation-bar-item slot="left" text="取消" @tap="back"/>
          <navigation-bar-item @tap="confirm" slot="right" text="确定"/>
        </navigation-bar>
        <div class="wrapper">
            <div class="point">
                <touch class="star" v-for="star in sort(stars)" @tap="mark(star.score)" :key="star.score">
                    <icon class="icon" name="light-star" v-show="star.light">
                    </icon>
                    <icon class="icon" name="dark-star" v-show="!star.light">
                    </icon>
                </touch>
            </div>
            <touch class="content">
                <textarea name="name" rows="10" placeholder="我的评论" v-model="commentContent"></textarea>
            </touch>
        </div>

    </div>
    </transition>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Icon from '@/components/Icon'
export default {
  name: 'addComment',
  components: {
    NavigationBar,
    NavigationBarItem,
    Icon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
    },
    showKeyboard () {
      console.log(window.Keyboard)
      console.log(this.$Keyboard)
      if (this.$Keyboard) {
        this.$Keyboard.show()
      }
    },
    hideKeyboard () {
      if (this.$Keyboard) {
        this.$Keyboard.hide()
      }
    },
    clean () {
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].light = false
      }
      this.commentContent = ''
    }
  },
  watch: {
    value (val) {
      this.show = val
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
        this.clean()
      }
    },
    show (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      stars: [
        {score: 1, name: 'star', light: false},
        {score: 2, name: 'star', light: false},
        {score: 3, name: 'star', light: false},
        {score: 4, name: 'star', light: false},
        {score: 5, name: 'star', light: false}
      ],
      show: false,
      commentContent: ''
    }
  },
  mounted () {
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
.wrapper {
    position: relative
    flex-grow: 1
}
.point {
    display: flex;
    justify-content: center;
    align-items: center
    border-bottom: 1px #d3d3d3 solid;
    height: 70px;
    .star {
        width: 40px;
        margin: 0 10px;
    }
}
.content {
    position: absolute
    top: 71px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    textarea {
        padding: 20px;
        box-sizing: border-box
        width: 100%;
        font-size: 14px;
        border: none;
        outline: none;
        overflow: scroll;
        resize: none;
        height: 92%
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
