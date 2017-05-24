<template>
  <div class="toc">
    <scroller style="flex-grow:1">
      <list-item v-for="(item, index) in data" :key="index" style="height: 49px;line-height: 49px;font-family: serif" :style="{opacity: item.cache ? 1 : 0.5}" :text="item.name" @tap="tap(item, index)"><icon v-if="item.lock" name="lock" style="height: 100%; width: 20px; color: #666;"></icon></list-item>
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
    tap (item, index) {
      this.$emit('tap', item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.toc{
  display: flex;
}
</style>
