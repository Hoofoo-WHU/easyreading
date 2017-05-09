<template>
  <router-content style="flex-direction:column">
    <navigation-bar title="消息通知">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
     <tab name="Tab" class="tab" :items="items"></tab>
    </scroller>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import Tab from '@/components/Tab'

export default {
  name: 'new',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    Tab
  },
  data () {
    return {
      msg: '这里是搜索模块',
      items: [
        {title: '提醒', content: '1111111111111'},
        {title: '通知', content: '2222222222222'},
        {title: '推荐', content: '3333333333333'}
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
.tab {
  /*宽高必须设置，否则是0*/
  width: 100%;
}
</style>
