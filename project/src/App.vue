<template>
  <div>
    <transition :name="transitionName" @before-enter="beforeEnter" @before-leave="beforeLeave" @after-enter="afterEnter" @after-leave="afterLeave">
      <keep-alive include="main,read">
          <router-view/>
      </keep-alive>
    </transition>
    <action-sheet :show="$store.state.read.showmore" @show="modalshow" @hide="modalhide" @cancel="$store.state.read.showmore = false">
      <action-sheet-button text="加入书架"></action-sheet-button>
      <action-sheet-button text="书籍详情" @tap="toDetail"></action-sheet-button>
      <action-sheet-button text="测试"></action-sheet-button>
    </action-sheet>
  </div>
</template>

<script>
import RouterWrapper from '@/components/RouterWrapper'
import {ActionSheet, ActionSheetItem, ActionSheetButton} from '@/components/ActionSheet'
export default {
  name: 'app',
  components: {
    RouterWrapper,
    ActionSheet,
    ActionSheetItem,
    ActionSheetButton
  },
  data () {
    return {
      transitionName: 'push',
      velocity: require('velocity-animate'),
      routing: false
    }
  },
  watch: {
    '$route': function (to, from) {
      // console.log(to)
      // console.log(from)
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      // console.log(toDepth === fromDepth)
      this.transitionName = this.$router.isBack ? 'pop' : 'push'
    }
  },
  methods: {
    toDetail () {
      this.routing = true
      console.log(this.$store.state.read.bookid)
      this.$router.push({'name': 'detail'})
    },
    modalshow () {
      this.$store.commit('addmodal', this.closemodal)
    },
    modalhide () {
      this.$store.commit('removemodal', this.closemodal)
    },
    closemodal () {
      this.$store.state.read.showmore = false
    },
    beforeEnter: function () {
      this.$store.commit('routing', true)
    },
    beforeLeave: function () {
      this.$store.commit('routing', true)
    },
    afterEnter: function () {
      this.$store.commit('routing', false)
    },
    afterLeave: function () {
      this.$store.commit('routing', false)
    }
  },
  mounted () {
    document.addEventListener('backbutton', () => {
      if (this.$store.getters.hasModal) {
        this.$store.commit('closemodal')
      } else if (this.$route.name !== 'main') {
        this.$router.back()
      } else {
        this.$app.exitApp()
      }
    }, false)
    // console.log(this.velocity)
    // this.velocity(this.$el, { translateX: '-50%' }, { duration: 600 })
  }
}
</script>

<style lang="css">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
.push-enter-active, .push-leave-active, .pop-enter-active, .pop-leave-active {
  transition: all 0.4s ease;
  /*box-shadow: 0 0 10px #888;*/
}
.push-leave-active{
  z-index: -10;
  transition: all 0.6s ease;
  transform: translateX(-50%) translateZ(0);
}
.push-enter{
  transform: translateX(100%) translateZ(0);
}
.pop-enter-active{
  z-index: -10;
}
.pop-enter{
  transform: translateX(-50%) translateZ(0);
}
.pop-leave-active{
  transform: translateX(100%) translateZ(0);
}
</style>
