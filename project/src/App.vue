<template>
  <transition :name="transitionName" @before-enter="beforeEnter" @before-leave="beforeLeave" @after-enter="afterEnter" @after-leave="afterLeave">
    <keep-alive>
        <router-view/>
    </keep-alive>
  </transition>
</template>

<script>
import RouterWrapper from '@/components/RouterWrapper'
export default {
  name: 'app',
  components: {
    RouterWrapper
  },
  data () {
    return {
      transitionName: 'push',
      velocity: require('velocity-animate')
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
