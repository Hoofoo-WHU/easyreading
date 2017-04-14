<template>
  <svg version="1.1" :class="clazz" :viewBox="box">
    <path :d="path.d" :fill="path.fill" v-for="path in icon.paths"/>
  </svg>
</template>

<style lang="css" scoped>
  .svg-icon {
    display: inline-block;
    fill: currentColor;
    user-select: none;
  }

  .svg-icon.spin {
    animation: fa-spin 1s 0s infinite linear;
  }

  @keyframes fa-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<script>

  import convert from './lib/parse'

  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      spin: Boolean
    },
    computed: {
      clazz () {
        return {
          'svg-icon': true,
          spin: this.spin
        }
      },
      icon () {
        var xml = require(`!xml-loader!./svg/${this.name}.svg`)
        // console.log(xml.svg)
        const t = xml.svg.$.viewBox.split(' ')
        return {
          width: t[2],
          height: t[3],
          paths: convert(xml.svg)
        }
      },
      box () {
        return `0 0 ${this.icon.width} ${this.icon.height}`
      }
    }
  }
</script>
