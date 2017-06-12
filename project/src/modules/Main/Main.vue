<template>
  <div id="app">
    <router-wrapper class="view">
      <keep-alive>
        <!-- <transition name='slide-fade'> -->
          <router-view/>
        <!-- </transition> -->
      </keep-alive>
    </router-wrapper>
    <bottom-bar>
      <bottom-bar-item @tap="replace('shelf')" text="书架" icon="shelf" :active="router === 'shelf'"/>
      <bottom-bar-item @tap="replace('store')" text="书城" icon="store" :active="router === 'store'"/>
      <bottom-bar-item @tap="replace('search')" text="搜索" icon="search" :active="router === 'search'"/>
      <bottom-bar-item @tap="replace('my')" text="我的" icon="account" :active="router === 'my'"/>
      <!--<bottom-bar-item @tap="replace('test')" text="测试" icon="settings" :active="router === 'test'"/>-->
    </bottom-bar>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { BottomBar, BottomBarItem } from '@/components/BottomBar'
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import RouterWrapper from '@/components/RouterWrapper'
export default {
  name: 'main',
  data () {
    return {}
  },
  components: {
    Icon,
    BottomBar,
    BottomBarItem,
    NavigationBar,
    NavigationBarItem,
    RouterWrapper
  },
  computed: {
    router: function () {
      return this.$route.name
    },
    activeMoudle: function () {
      var matched = this.$route.matched
      return matched[matched.length - 1].instances.default
    }
  },
  methods: {
    to: function (name) {
      // console.log(params.name)
      this.$router.push({'name': name})
      // console.log(this.activeMoudle)
    },
    replace: function (name) {
      if (this.router === name) {
        this.scrollTop()
      } else {
        this.$router.replace({'name': name})
      }
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
    this.replace('shelf')
    setTimeout(() => {
      if (this.$statusBar) {
        this.$statusBar.show()
      }
      if (this.$splashScreen) {
        this.$splashScreen.hide()
      }
    }, 1000)
  }
}
</script>

<style lang="css" scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: none;
  background: #ffffff;
}
.view{
  /*width: 100%;*/
  flex-grow: 1;
  /*display: flex;*/
  /*flex-direction: column;*/
}
/*.slide-fade-enter-active {
  transition: all .8s;
}
.slide-fade-leave-active {
  transition: all .8s;
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-active{
  transform: translateX(-100%);
}*/
</style>
