<template lang="html">
  <touch class="slider" @swipeleft="turnleft" @swiperight="turnright">
      <transition :name="transitionName">
          <div class="slider-item" v-for="img in sort(imgUrl)" :key="img.id" v-if="img.show">
              <img :src="img.url" alt="">
          </div>
      </transition>
      <div class="dots">
          <div v-for="img in sort(imgUrl)" :class="[img.show?'active':'']">
          </div>
      </div>
  </touch>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    imgUrl: {
      type: Array,
      default: function () {
        return [
          {
            id: 1,
            show: true,
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491294435&di=b4e186d6e59e7a518b8f992d0089322f&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f79056ebb87632f875a944fc12c6.jpg'
          },
          {
            id: 2,
            show: false,
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490699762627&di=3dbb1331ce99460463f234b31bce0c94&imgtype=0&src=http%3A%2F%2Fpic.35pic.com%2Fnormal%2F07%2F51%2F91%2F446817_151444723000_2.jpg'
          },
          {
            id: 3,
            show: false,
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490699888711&di=68a6c8c2e04e381bbf276d8a74d23f19&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F04%2F00%2Fb06bebdeb9ed7b54b78d9ab244b455f7.jpg'
          }
        ]
      }
    },
    changeSpeed: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      transitionName: 'left'
    }
  },
  methods: {
    line () {
      for (let i = 0; i < this.imgUrl.length; i++) {
        if (i === 0) {
          this.imgUrl[0].last = this.imgUrl[this.imgUrl.length - 1]
        } else {
          this.imgUrl[i].last = this.imgUrl[i - 1]
        }
        if (i === this.imgUrl.length - 1) {
          this.imgUrl[i].next = this.imgUrl[0]
        } else {
          this.imgUrl[i].next = this.imgUrl[i + 1]
        }
      }
    },
    // 确保v-for按id顺序渲染列表
    sort (arr) {
      return arr.slice().sort((item1, item2) => { return item1.id - item2.id })
    },
    cur () {
      for (let i = 0; i < this.imgUrl.length; i++) {
        if (this.imgUrl[i].show === true) {
          return i
        }
      }
    },
    auto () {
      let me = this
      this.timer = setInterval(function () {
        let index = me.cur()
        me.transitionName = 'left'
        me.imgUrl[index].show = false
        me.imgUrl[index].next.show = true
      }, me.changeSpeed)
    },
    turnleft () {
      clearInterval(this.timer)
      this.transitionName = 'left'
      let index = this.cur()
      this.imgUrl[index].show = false
      this.imgUrl[index].next.show = true
      this.auto()
    },
    turnright () {
      clearInterval(this.timer)
      this.transitionName = 'right'
      let index = this.cur()
      this.imgUrl[index].show = false
      this.imgUrl[index].last.show = true
      this.auto()
    }
  },
  mounted () {
    this.line()
    this.auto()
  }
}
</script>

<style lang="stylus" scoped>
.slider {
    position: relative;
    background-color: grey;
    width: 100%;
    height: 140px;
    overflow: hidden;
    .slider-item {
        width: 100%;
        height: 100%
        position: absolute;
        top: 0;
        left: 0;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
.left-enter-active, .left-leave-active{
    transition: all .3s ease;
}
.left-enter {
    transform: translateX(100%);
}
.left-leave-to {
    transform: translateX(-100%);
}
.right-enter-active, .right-leave-active{
    transition: all .3s ease;
}
.right-enter {
    transform: translateX(-100%);
}
.right-leave-to {
    transform: translateX(100%);
}
.dots {
    position: absolute;
    display: flex;
    justify-content: space-between;
    right: 40px;
    bottom: 20px;
    z-index: 10000;
    div {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        border: 1px solid grey;
        margin-left: 10px;
    }
    .active {
        background-color: #fff;
    }
}
</style>
