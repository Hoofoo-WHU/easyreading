<template lang="html">
    <div class="slider">
        <ul class="container">
            <li v-for="img in imgUrl">
                <img :src="img.url" alt="">
            </li>
        </ul>
        <div class="dots">
            <div v-for="img in imgUrl">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    imgUrl: {
      tyepe: Array,
      default: function () {
        return [
          {
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491294435&di=b4e186d6e59e7a518b8f992d0089322f&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f79056ebb87632f875a944fc12c6.jpg'
          },
          {
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490699762627&di=3dbb1331ce99460463f234b31bce0c94&imgtype=0&src=http%3A%2F%2Fpic.35pic.com%2Fnormal%2F07%2F51%2F91%2F446817_151444723000_2.jpg'
          },
          {
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490699888711&di=68a6c8c2e04e381bbf276d8a74d23f19&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F04%2F00%2Fb06bebdeb9ed7b54b78d9ab244b455f7.jpg'
          }
        ]
      }
    },
    changeSpeed: {
      type: Number,
      default: 2000
    }
  },
  computed: {
    slider () {
      return document.body.querySelector('.slider')
    },
    sliderWidth () {
      return this.slider.offsetWidth
    },
    container () {
      return document.body.querySelector('.container')
    },
    imgList () {
      return document.body.querySelectorAll('.container li')
    },
    dotList () {
      return document.body.querySelectorAll('.dots div')
    }
  },
  watch: {
  },
  data () {
    return {
      now: 0
    }
  },
  methods: {
    sliderEvent () {
      let me = this
      me.container.innerHTML += me.container.innerHTML
      me.container.style.width = me.imgList.length * 100 + '%'
      for (let i = 0; i < me.imgList.length; i++) {
        me.imgList[i].style.width = 1 / me.imgList.length * 100 + '%'
      }
      // let startPoint = 0
      // let startEle = 0
      me.cssTransform(me.container, 'translateX', 0)
      me.autoPlay()
      /* me.slider.addEventListener('touchstart', function (e) {
        clearInterval(me.timer)
        me.container.style.transition = 'none'
        let moveX = me.cssTransform(me.container, 'translateX')
        me.now = Math.round(-moveX / me.sliderWidth)
        if (me.now === 0) {
          me.now = me.imgList.length
        } else if (me.now === me.imgList.length - 1) {
          me.now = me.dotList.length - 1
        }
        me.cssTransform(me.container, 'translateX', -me.now * me.sliderWidth)
        startPoint = e.changedTouches[0].pageX
        startEle = me.cssTransform(me.container, 'translateX')
      })
      me.slider.addEventListener('touchmove', function (e) {
        let endPoint = e.changedTouches[0].pageX
        let disX = endPoint - startPoint
        me.cssTransform(me.container, 'translateX', disX + startEle)
      })
      me.slider.addEventListener('touchend', function (e) {
        let moveX = me.cssTransform(me.container, 'translateX')
        me.now = Math.round(-moveX / me.sliderWidth)
        me.tab()
        me.autoPlay()
      }) */
    },
    autoPlay () {
      let me = this
      clearInterval(me.timer)
      me.timer = setInterval(function () {
        if (me.now === me.imgList.length - 1) {
          me.now = me.dotList.length - 1
        }
        me.container.style.transition = 'none'
        me.cssTransform(me.container, 'translateX', -me.now * me.sliderWidth)
        setTimeout(function () {
          me.now ++
          me.tab()
          console.log(me.now)
          console.log(me.imgList.length)
        }, 30)
      }, me.changeSpeed)
    },
    tab () {
      let me = this
      me.container.style.transition = '.5s'
      me.cssTransform(me.container, 'translateX', -me.now * me.sliderWidth)
      for (let i = 0; i < me.dotList.length; i++) {
        me.dotList[i].className = ''
      }
      me.dotList[me.now % me.dotList.length].className = 'active'
    },
    cssTransform (ele, attr, val) {
      if (!ele.transform) {
        ele.transform = {}
      }
      // 当传入值时对属性进行设置。
      if (arguments.length > 2) {
        ele.transform[attr] = val
        let sval = ''
        for (let key in ele.transform) {
          if (key === 'translateX') {
            sval += key + '(' + ele.transform[key] + 'px)'
          }
          ele.style.WebkitTransform = ele.style.transform = sval
        }
      } else {
        val = ele.transform[attr]
        if (typeof val === 'undefined') {
          if (attr === 'translateX') {
            val = 0
          }
        }
        return val
      }
    }
  },
  mounted: function () {
    let me = this
    me.$nextTick(function () {
    // 代码保证 this.$el 在 document 中
      // me.sliderEvent()
    })
  }
}
</script>
<style lang="stylus">
.slider {
    position: relative;
    background-color: grey;
    width: 100%;
    height: 140px;
    overflow: hidden;
}
.container {
    position: absolute;
    list-style: none;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    height: 100%;
    li {
        margin: 0;
        padding: 0;
        display: inline-block;
        height: 100%;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
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
