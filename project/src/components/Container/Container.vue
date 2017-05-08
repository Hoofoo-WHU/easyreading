<template>
  <div class='container border'>
    <slot name="title">
      <span class="title" v-if="title">{{title}}</span>
    </slot>
    <slot></slot>
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
    border: {
      type: Boolean,
      default: true
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
  margin-bottom: 15px;
  .title{
    text-align: left;
    display: block;
    font-size: 16px;
    font-weight: lighter;
    padding: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
    bottom: 0;
    transform-origin: left bottom;
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
