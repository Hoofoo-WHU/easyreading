<template>
  <div id="app">
    <div class="navigation-bar" v-tap="{methods: scrollTop}">{{ router }}</div>
    <div class="view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="bottom-bar">
      <span class="router" v-tap="{methods: to, name: 'shelf'}" :class="{active: router === 'shelf'}">书架</span>
      <span class="router" v-tap="{methods: to, name: 'store'}" :class="{active: router === 'store'}">书城</span>
      <span class="router" v-tap="{methods: to, name: 'search'}" :class="{active: router === 'search'}">搜索</span>
      <span class="router" v-tap="{methods: to, name: 'my'}" :class="{active: router === 'my'}">我的</span>
      <span class="router" v-tap="{methods: to, name: 'test'}" :class="{active: router === 'test'}">测试</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    router: function () {
      return this.$route.name
    },
    activeMoudle: function () {
      return this.$route.matched[0].instances.default
    }
  },
  methods: {
    to: function (params) {
      // console.log(params.name)
      this.$router.push({'name': params.name})
      // console.log(this.activeMoudle)
    },
    scrollTop: function () {
      if (this.activeMoudle.scrollTop) {
        this.activeMoudle.scrollTop()
      } else {
        console.error('缺少方法：scrollTop', this.activeMoudle)
      }
    }
  },
  mounted () {
    // console.log(this.$router)
    document.addEventListener('backbutton', function () {
      navigator.app.exitApp()
    }, false)
  }
}
</script>

<style lang="css" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.active {
  color: #2786f3;
}
.view{
  width: 100%;
  flex: 1;
  background: #f2f2f2;
  text-align: center;
  overflow: hidden;
  display: flex;
}
.navigation-bar{
  height: 45px;
  display: inline;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
}
.bottom-bar{
  height: 49px;
  display: flex;
  background-color: #fff;
}
.router{
  flex: 1;
  -webkit-appearance: none;
  text-align: center;
  line-height: 49px;
}
</style>
