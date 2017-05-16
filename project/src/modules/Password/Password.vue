<template>
  <router-content style="flex-direction:column;background:#fff">
    <navigation-bar title="修改密码">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <div class="modify">
        <input class="input" placeholder="旧密码" v-model="old"/>
        <input class="input" placeholder="新密码" v-model="new"/>
        <touch @tap="login" class="denglu">登录</touch>
      </div>
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
  name: 'password',
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
