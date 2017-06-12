<template>
  <div class="wrapper">
    <transition name="fade" @before-enter="enter" @after-leave="leave">
      <touch v-if="show" class="back" @tap="cancel"></touch>
    </transition>
    <transition name="trans">
      <div v-if="show" class="content">
        <touch @tap="stop" class="items">
          <slot></slot>
        </touch>
        <touch class="cancel" @tap="stop">
          <action-sheet-button @tap="cancel" text="取消"></action-sheet-button>
        </touch>
      </div>
    </transition>
  </div>
</template>
<script>
import ActionSheetButton from './ActionSheetButton.vue'
export default {
  name: 'ActionSheet',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ActionSheetButton
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
    enter () {
      this.$emit('show')
    },
    leave () {
      this.$emit('hide')
    },
    stop (e) {
      e.srcEvent.stopImmediatePropagation()
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper{
  z-index: 300;
  // position: relative;
  .back{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #0005;
    z-index: 300;
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    border-radius: 12px;
    overflow: hidden;
    z-index: 300;
    .items{
      overflow: hidden;
      border-radius: 12px;
      background: #FAFAFA;
    }
    .cancel{
      background: #FAFAFA;
      margin-top: 10px;
      height: 53px;
      border-radius: 12px;
      overflow: hidden;
    }
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
