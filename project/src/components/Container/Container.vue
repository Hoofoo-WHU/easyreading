<template>
  <div>
    <div class='container' :class="{border: divider}">
      <slot name="title">
        <div style="display: flex;">
          <span class="title" v-if="title">{{title}}</span>
          <touch class="more" v-if="title && more" @tap="more"><span style="line-height: 48px; color:#787488">更多</span><icon name="front" style="width: 10px; height: 100%;color:#787488"></icon></touch>
        </div>
      </slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'container',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    more: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    more () {
      this.$emit('more')
    }
  }
}
</script>

<style lang="stylus" scoped>
.container{
  user-select: none;
  width: 100%;
  position: relative;
  height: inherit;
  .title{
    flex-grow: 1;
    text-align: left;
    display: block;
    line-height: 48px;
    font-size: 14px;
    // font-family: SourceHanSerif;
    // background: green;
    // font-weight: lighter;
    padding:  0 1em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #030303;
    height: 48px;
  }
  .more{
    width: auto;
    display: flex;
    font-size: 10px;
    height: 48px;
    // font-weight: lighter;
    padding: 0 1em;
    overflow: hidden;
    // background: red;
    color: #030303;
  }
}
.border{
  // &:before{
  //   content: '';
  //   width: 100%;
  //   position: absolute;
  //   opacity: .5;
  //   top: -1px;
  //   border-top: 1px solid #c8c7cc;
  //   transform-origin: left bottom;
  // }
  &:after{
    content: '';
    opacity: .5;
    position: absolute;
    left: 1em;
    right: 1em;
    border-bottom: 1px solid #c8c7cc;
    bottom: -1px;
    transform-origin: left top;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.0),
only screen and (min--moz-device-pixel-ratio: 2.0),
only screen and (-o-min-device-pixel-ratio: 200/100),
only screen and (min-device-pixel-ratio: 2.0) {
  .border:before {
    transform: scaleY(0.5);
  }
  .border:after {
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.5),
only screen and (min--moz-device-pixel-ratio: 2.5),
only screen and (-o-min-device-pixel-ratio: 250/100),
only screen and (min-device-pixel-ratio: 2.5) {
  .border:before {
    transform: scaleY(0.5);
  }
  .border:after {
    transform: scaleY(0.4);
  }
}
</style>
