<template>
  <router-content style="flex-direction:column;background:#fff">
    <navigation-bar title="设置">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
      <navigation-bar-item @tap="change" slot="right" icon="synchronization"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <aside class="aside">
      <list-item v-for="(item, index) in items" :key="index" right icon="" :text="item.title" style="color:grey;height:50px;line-height:50px"><switches @tap="item.switchesState=!item.switchesState" :on="item.switchesState" ></switches></list-item>
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
      items: []
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    back () {
      this.$router.go(-1)
    },
    change () {
      console.log(this.items)
      this.$http.put('/user/profile', {'options_sync_progress': this.items[0].switchesState, 'options_clean_cache': this.items[1].switchesState, 'options_display_progress': this.items[2].switchesState, 'options_wifi_download_only': this.items[3].switchesState, 'options_accept_push': this.items[4].switchesState, 'options_auto_buy_chapter': this.items[5].switchesState})
      .then(response => {

      })
    }
  },
  mounted () {
    this.$http.get('/user/profile')
    .then(response => {
      this.items = [{title: '是否同步进度', switchesState: false},
        {title: '是否自动清除缓存', switchesState: false},
        {title: '是否显示阅读进度', switchesState: false},
        {title: '是否仅用wifi下载', switchesState: false},
        {title: '是否接受推送', switchesState: false},
        {title: '是否自动购买章节', switchesState: false}]
      this.items[0].switchesState = response.data.options_sync_progress
      this.items[1].switchesState = response.data.options_clean_cache
      this.items[2].switchesState = response.data.options_display_progress
      this.items[3].switchesState = response.data.options_wifi_download_only
      this.items[4].switchesState = response.data.options_accept_push
      this.items[5].switchesState = response.data.options_auto_buy_chapter
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller{
  flex-grow: 1;
}
</style>
