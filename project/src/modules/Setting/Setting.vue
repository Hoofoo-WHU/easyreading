<template>
  <router-content style="flex-direction:column">
    <navigation-bar title="设置">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <aside class="aside">
        <ul>
          <li><p>是否同步进度</p><switches @tap="switchesState=!switchesState" :on="switchesState" class="icon"></switches></li>
          <li><p>是否自动清除缓存</p><switches @tap="switchesState1=!switchesState1" :on="switchesState1" class="icon"></switches></li>
          <li><p>是否显示阅读进度</p><switches @tap="switchesState2=!switchesState2" :on="switchesState2" class="icon"></switches></li>
          <li><p>是否仅用wifi下载</p><switches @tap="switchesState3=!switchesState3" :on="switchesState3" class="icon"></switches></li>
          <li><p>是否接受推送</p><switches @tap="switchesState4=!switchesState4" :on="switchesState4" class="icon"></switches></li>
          <li><p>是否自动购买章节</p><switches @tap="switchesState5=!switchesState5" :on="switchesState5" class="icon"></switches></li>
        </ul>
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

export default {
  name: 'setting',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    Switches
  },
  data () {
    return {
      switchesState: false,
      switchesState1: true,
      switchesState2: false,
      switchesState3: true,
      switchesState4: false,
      switchesState5: true
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
.icon{
  float: right;
  margin-top: 10px
}
aside ul li {
  height:40px;
  background: #fff;
  padding: 0 4%;
  border-bottom:1px solid #efeff4;
  display:block;
}
aside ul li p{
  font-size: 12px;
  line-height: 40px;
  text-align: center;
  color: #000;
  display: inline-block;
}
</style>
