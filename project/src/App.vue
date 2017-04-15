<template>
  <div id="app">
    <navigation-bar v-tap.prevent="{methods: scrollTop}" :title="router"></navigation-bar>
    <div class="view">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <bottom-bar>
      <bottom-bar-item v-tap="{methods: to, name: 'shelf'}" name="书架" icon="shelf" :active="router === 'shelf'"/>
      <bottom-bar-item v-tap="{methods: to, name: 'store'}" name="书城" icon="store" :active="router === 'store'"/>
      <bottom-bar-item v-tap="{methods: to, name: 'search'}" name="搜索" icon="search" :active="router === 'search'"/>
      <bottom-bar-item v-tap="{methods: to, name: 'my'}" name="我的" icon="account" :active="router === 'my'"/>
      <bottom-bar-item v-tap="{methods: to, name: 'test'}" name="测试" icon="settings" :active="router === 'test'"/>
    </bottom-bar>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { BottomBar, BottomBarItem } from '@/components/BottomBar'
import NavigationBar from '@/components/NavigationBar'
export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    Icon,
    BottomBar,
    BottomBarItem,
    NavigationBar
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
.view{
  width: 100%;
  flex: 1;
  background: #f2f2f2;
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
