<template>
  <div class="toc">
    <scroller style="flex-grow:1">
      <list-item v-for="(item, index) in data" :key="index" style="height: 53px;line-height: 53px;font-family: serif" :style="{opacity: item.cache ? 1 : 0.5}" :text="item.name" @tap="tap(index)"><icon v-if="item.lock" name="down" style="height: 100%; width: 25px;"></icon></list-item>
    </scroller>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller'
import ListItem from '@/components/ListItem'
import Icon from '@/components/Icon'
export default {
  name: 'Toc',
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  components: {
    Scroller,
    ListItem,
    Icon
  },
  data () {
    return {
    }
  },
  methods: {
    tap (index) {
      this.$emit('tap', index)
    }
  },
  mounted () {
    console.log(this.data)
  }
}
</script>

<style lang="stylus" scoped>
.toc{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
</style>
