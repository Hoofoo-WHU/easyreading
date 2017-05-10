<template>
  <button-item class="button border" @tap="tap">
    <icon v-if="icon" class="icon" :name="icon"></icon>
    <div class="content">{{text}}</div>
    <div class="right">
      <slot>
        <icon v-if="right" style="width: 12px;height: 100%;color:#c8c7cc" name="front">
        </icon>
      </slot>
    </div>
  </button-item>
</template>

<script>
import ButtonItem from '@/components/ButtonItem'
import Icon from '@/components/Icon'
export default {
  name: 'ListItem',
  components: {
    ButtonItem,
    Icon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    tap () {
      this.$emit('tap')
    }
  }
}
</script>

<style lang="stylus" scoped>
.button{
  height: 44px;
  line-height: 44px;
  overflow: visible;
}
.icon{
  width: 25px;
  height:100%;
  float: left;
  margin-left: 22px;
}
.content{
  padding-left: 22px;
  text-indent: 1em;
}
.right{
  height: 100%;
  position: absolute;
  right: 1em;
  top: 0;
  bottom: 0;
}
.border:before{
  content: none;
}
.border:after{
  content: '';
  position: absolute;
  left: 22px;
  right: 0;
  bottom: -1px;
  border-bottom: 1px solid #c8c7cc;
  transform-origin: left top;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.0),
only screen and (min--moz-device-pixel-ratio: 2.0),
only screen and (-o-min-device-pixel-ratio: 200/100),
only screen and (min-device-pixel-ratio: 2.0) {
  .border:after {
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.5),
only screen and (min--moz-device-pixel-ratio: 2.5),
only screen and (-o-min-device-pixel-ratio: 250/100),
only screen and (min-device-pixel-ratio: 2.5) {
  .border:after {
    transform: scaleY(0.4);
  }
}
</style>
