<template>
  <div>
    <transition name="fade">
      <div v-if="value" class="loading" :style="{background: background, color: color}">
        <transition name="scale">
          <icon v-if="showIcon" class="icon" name="loading" spin></icon>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import Icon from '@/components/Icon'
export default {
  name: 'Loading',
  components: {
    Icon
  },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    background: {
      type: String
    },
    color: {
      type: String
    }
  },
  watch: {
    value (value) {
      if (value) {
        setTimeout(() => {
          this.showIcon = value
        }, 0)
      } else {
        this.showIcon = value
      }
    }
  },
  data () {
    return {
      showIcon: this.value
    }
  }
}
</script>
<style lang="stylus" scoped>
.loading{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  .icon{
    width: 25px;
    height: 25px;
  }
}
.fade-enter-active,.fade-leave-active{
  transition: all .3s ease;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
.scale-enter-active,.scale-leave-active{
  transition: all .4s ease;
}
.scale-enter, .scale-leave-active{
  width: 0 !important;
  height: 0 !important;
}
</style>
