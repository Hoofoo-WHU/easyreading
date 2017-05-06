<template>
  <transition :name="transitionName">
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
      transitionName: 'push'
    }
  },
  watch: {
    '$route': function (to, from) {
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      // console.log(toDepth === fromDepth)
      this.transitionName = this.$router.isBack ? 'pop' : 'push'
    }
  }
}
</script>

<style lang="css">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:#f2f2f2;
}
* {
  margin: 0;
  padding: 0;
}
.push-enter-active, .push-leave-active, .pop-enter-active, .pop-leave-active {
  transition: all 0.6s cubic-bezier(.3,.5,.29,.99);
  /*box-shadow: 0 0 10px #888;*/
}
.push-enter, .push-leave, .pop-enter, .pop-leave {
   /*box-shadow: 0 0 10px #888;*/
}
.push-leave-active{
  z-index: -10;
  transform: translateX(-50%) scale(0.95);
}
.push-enter{
  transform: translateX(100%) translateZ(0);
}
.pop-enter-active{
  z-index: -10;
}
.pop-enter{
  transform: translateX(-50%) scale(0.95);
}
.pop-leave-active{
  transform: translateX(100%) translateZ(0);
}
</style>
