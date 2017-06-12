<template>
  <div class="toastWrapper">
    <transition name="scale" @after-leave="hide">
    	<span class="toast" v-if="show">
    		{{text}}
    	</span>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      show: false,
      text: '',
      time: undefined
    }
  },
  methods: {
    open (text, timeout) {
      if (this.time) {
        clearTimeout(this.time)
      }
      let time = timeout !== undefined ? timeout : 1500
      this.text = text
      this.show = true
      this.time = setTimeout(() => {
        this.show = false
      }, time)
    },
    hide () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="stylus" scoped>
.toastWrapper{
  position: fixed;
  top: 20%;
  left: 0;
  right: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 400;
  .toast{
    display: inline-block;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 0.5em 1em;
    border-radius: 6px;
  }
}
.scale-enter-active, .scale-leave-active {
  transition: all .4s cubic-bezier(.3,.5,.29,.99);
}
.scale-enter, .scale-leave-active {
  transform: scale(0.8);
  opacity: 0;
}

</style>
