<template>
  <div class="wrapper">
    <transition name="fade">
      <touch v-if="show" class="back" @tap="cancel"></touch>
    </transition>
    <transition name="trans">
      <div v-if="show" class="content">
        <touch @tap="stop" class="items blur">
          <slot></slot>
        </touch>
        <touch class="cancel blur" @tap="stop">
          <button-item  @tap="cancel">取消</button-item>
        </touch>
      </div>
    </transition>
  </div>
</template>
<script>
import ButtonItem from '@/components/ButtonItem'
export default {
  name: 'ActionSheet',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ButtonItem
  },
  data () {
    return {
    }
  },
  methods: {
    cancel (e) {
      setTimeout(() => {
        this.$emit('cancel')
      }, 0)
    },
    stop (e) {
      e.srcEvent.stopImmediatePropagation()
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper{
  z-index: 200;
  .back{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #0003;
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 10px;
    overflow: hidden;
    .items{
      overflow: hidden;
      border-radius: 12px;
    }
    .cancel{
      margin-top: 10px;
      height: 53px;
      border-radius: 12px;
      overflow: hidden;
    }
  } 
}
@supports not (-webkit-backdrop-filter: blur(8px)){
  .blur{
    background: #fff;
  }
}
@supports (-webkit-backdrop-filter: blur(8px)){
  .blur{
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px) brightness(1.2);
  }
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.4s cubic-bezier(.3,.5,.29,.99);
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
.trans-enter-active, .trans-leave-active{
  transition: all 0.4s cubic-bezier(.3,.5,.29,.99);
}
.trans-enter, .trans-leave-active{
  transform: translateY(100%) translateZ(0);
}
</style>
