<template>
  <div class="range">
    <div class="left">
      <slot name="left">
      </slot>
    </div>
    <div class="wrapper">
      <div class="line" ref="line">
        <div class="lineactive" :style="{left: step > 0 ? 0 + 'px' : trueValue + 'px'}"></div>
      </div>
      <div v-if="step !== 0">
        <div v-for="i in (max - min) / step + 1" style="position: absolute; width: 6px; border-radius: 50%; height: 6px; background: #aaa; top: 50%; transform: translate3D(-50%,-50%,0)" :style="{left: (i - 1) * width / (max - min) * step + 'px'}">
          
        </div >
      </div>
      <touch :trans="!paning && mounted" class="thumb" @panmove="pan" @touchstart.prevent.native.stop @touchend.prevent.native.stop @touchmove.prevent.stop.native @mousedown.prevent.native.stop @mouseup.prevent.native.stop @mousemove.prevent.stop.native @panstart="panstart" @panend="panend" :style="'transform: translate3D(' + trueValue + 'px,0,0)'" :pan-options="{direction: 'horizontal', threshold: 5}"></touch>
    </div>
    <div class="right">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Range',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fix: 0,
      trueValue: 0,
      paning: false,
      width: 0,
      mounted: false
    }
  },
  methods: {
    panstart (e) {
      this.paning = true
      e.srcEvent.stopImmediatePropagation()
      this.fix = e.deltaX
      this.active = true
      this.oldTrueValue = this.trueValue
      this.$emit('start', this.value)
    },
    panend (e) {
      if (this.paning) {
        e.srcEvent.stopImmediatePropagation()
        this.fix = 0
        this.active = false
        this.paning = false
        if (this.step !== 0) {
          var _value = parseInt((this.value + this.step / 2 - this.min) / this.step) * this.step
          this.trueValue = this.step * this.width * (_value - this.min) / (this.max - this.min)
          this.$emit('input', _value)
          this.$emit('end', _value)
        } else {
          this.$emit('end', this.value)
        }
      }
    },
    pan (e) {
      if (this.paning) {
        e.srcEvent.stopImmediatePropagation()
        var newValue = this.oldTrueValue + (e.deltaX - this.fix)
        if (newValue < 0) {
          this.trueValue = 0
        } else if (newValue > this.width) {
          this.trueValue = this.width
        } else {
          this.trueValue = newValue
        }
        var _value = this.min + (this.max - this.min) * (this.trueValue / this.width)
        this._value = _value
        this.$emit('input', this._value)
      }
    }
  },
  mounted () {
    console.log('mounted')
    if (this.min >= this.max) {
      console.error('Range组件需要min小于max')
    }
    if (this.value > this.max || this.value < this.min) {
      console.error('Range组件value超出范围')
    }
    this.width = parseInt(getComputedStyle(this.$refs.line).width)
    this.trueValue = this.width * (this.value - this.min) / (this.max - this.min)
    if (this.step > 0) {
      this.trueValue = this.step * this.width * (this.value - this.min) / (this.max - this.min)
    }
    setTimeout(() => {
      this.mounted = true
    }, 0)
  }
}
</script>

<style lang="stylus" scoped>
.range{
  height: 40px;
  // background: #fcfcfc;
  display: flex;
  .left, .right{
    height: 100%;
  }
  .wrapper{
    position: relative;
    height: 100%;
    margin-left: 12px;
    right: 6px;
    flex-grow: 1;
    // background: red;
  }
  .line{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: 2px;
    border-radius: 1px;
    background: #157afb;
    overflow: hidden;
    .lineactive{
      height: 100%;
      background-color: #aaa;
      position: absolute;
      right: 0;
    }
  }
  .thumb{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    margin-top: -24px;
    margin-left: -24px;
    &:before{
      content: ''
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin-left: -8px;
      margin-top: -8px;
      border-radius: 50%;
      background: #157afb;
      transition: transform .3s ease;
    }
    &:active:before{
      transform: scale(1.2);
    }
    &[trans]{
      transition: transform .3s ease;
    }
  }
}
</style>
