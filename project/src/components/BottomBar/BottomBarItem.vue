<template>
  <div class="bottom-bar-item" :class="{active: active}">
    <icon class="icon" v-if="icon" :name="icon"></icon>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'BottomBarItem',
  props: {
    name: {
      type: String,
      default: 'bottom-bar-item'
    },
    icon: String,
    active: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.bottom-bar-item{
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #030303;
}
.icon{
  width: 25px;
  height: 25px;
  margin: 7px auto 0px auto;
}
.name{
  text-align: center;
  font-size: 10px;
}
.active{
  color: #157afb;
}
</style>
