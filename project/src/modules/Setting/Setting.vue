<template>
  <router-content style="flex-direction:column">
    <navigation-bar title="设置">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <aside class="aside">
      <list-item @tap="" v-for="item in items" right icon="" :text="item.title" style="color:grey;height:50px;line-height:50px"><switches @tap="item.switchesState=!item.switchesState" :on="item.switchesState" ></switches></list-item>
      </aside>
    </scroller>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import Switches from '@/components/Switches'
import ListItem from '@/components/ListItem'
export default {
  name: 'setting',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    Switches,
    ListItem
  },
  data () {
    return {
      items: [
        {title: '是否同步进度', switchesState: false},
        {title: '是否自动清除缓存', switchesState: true},
        {title: '是否显示阅读进度', switchesState: false},
        {title: '是否仅用wifi下载', switchesState: false},
        {title: '是否接受推送', switchesState: true},
        {title: '是否自动购买章节', switchesState: false}
      ]
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller{
  flex-grow: 1;
}
</style>
