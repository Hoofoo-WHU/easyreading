<template>
  <div class="toc">
    <scroller style="flex-grow:1">
      <list-item v-for="item in 20" :text="'第'+item+'章'"></list-item>
    </scroller>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller'
import ListItem from '@/components/ListItem'
import Container from '@/components/Container'
export default {
  name: 'Toc',
  components: {
    Scroller,
    ListItem,
    Container
  },
  data () {
    return {
    }
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
