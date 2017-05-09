<template>
  <div>
    <div class='container' :class="{border: border}">
      <slot name="title">
        <div style="display: flex;">
          <span class="title" v-if="title">{{title}}</span>
          <touch class="more" v-if="title && more">更多 <span style="color: #ccc">></span></touch>
        </div>
      </slot>
      <slot></slot>
    </div>
    <div style="margin: 0;padding: 0;border:none;height:8px;width:100%;background: none;"></div>
  </div>
</template>

<script>
export default {
  name: 'container',
  props: {
    title: {
      type: String,
      default: ''
    },
    more: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.container{
  user-select: none;
  background-color: #fff;
  width: 100%;
  position: relative;
  height: inherit;
  .title{
    flex-grow: 1;
    text-align: left;
    display: block;
    font-size: 12px;
    // font-weight: lighter;
    padding: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #030303;
  }
  .more{
    width: auto;
    display: block;
    font-size: 10px;
    // font-weight: lighter;
    padding: 12px;
    overflow: hidden;
    color: #030303;
  }
}
.border{
  &:before{
    content: '';
    width: 100%;
    position: absolute;
    opacity: .5;
    top: -1px;
    border-top: 1px solid #c8c7cc;
    transform-origin: left bottom;
  }
  &:after{
    content: '';
    opacity: .5;
    width: 100%;
    position: absolute;
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
