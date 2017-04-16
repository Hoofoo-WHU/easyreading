<template>
  <div id="app">
    <navigation-bar @tap.capture="scrollTop" :title="router">
      <navigation-bar-item @tap="test" slot="left" text="测试" icon="back" disable/>
      <navigation-bar-item @tap="test" slot="right" text="测试" right-icon/>
    </navigation-bar>
    <div class="view">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <bottom-bar>
      <bottom-bar-item @tap="to('shelf')" text="书架" icon="shelf" :active="router === 'shelf'"/>
      <bottom-bar-item @tap="to('store')" text="书城" icon="store" :active="router === 'store'"/>
      <bottom-bar-item @tap="to('search')" text="搜索" icon="search" :active="router === 'search'"/>
      <bottom-bar-item @tap="to('my')" disable text="我的" icon="account" :active="router === 'my'"/>
      <bottom-bar-item @tap="to('test')" text="测试" icon="settings" :active="router === 'test'"/>
    </bottom-bar>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { BottomBar, BottomBarItem } from '@/components/BottomBar'
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    Icon,
    BottomBar,
    BottomBarItem,
    NavigationBar,
    NavigationBarItem
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
    to: function (name) {
      // console.log(params.name)
      this.$router.push({'name': name})
      // console.log(this.activeMoudle)
    },
    scrollTop: function () {
      if (this.activeMoudle.scrollTop) {
        this.activeMoudle.scrollTop()
      } else {
        console.error('缺少方法：scrollTop', this.activeMoudle)
      }
    },
    test () {
      console.log('可以')
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
  user-select: none;
}
.view{
  width: 100%;
  flex: 1;
  background: #efeff4;
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
