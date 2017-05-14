<template lang="html">
  <touch class="slider" @swipeleft="turnleft" @swiperight="turnright">
      <transition :name="transitionName">
          <touch class="slider-item" v-for="img in sort(imgUrl)" :key="img.id" v-if="img.show" @tap="tapAction(img.id)">
              <img :src="img.url" alt="">
          </touch>
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
            url: 'http://7xw3pf.com1.z0.glb.clouddn.com/easyreading-slider01C03821-45E1-4936-986B-3E801637A790.png'
          },
          {
            id: 3,
            show: false,
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494505687766&di=16dcd86b89a4873ed7cc19d86e72e1df&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010e68566c1fdf6ac7256b29b6f91c.jpg%40900w_1l_2o_100sh.jpg'
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
    },
    tapAction (id) {
      this.$emit('tap', id)
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
