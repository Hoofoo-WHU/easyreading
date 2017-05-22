<template>
  <router-content style="flex-direction:column;background:#fff">
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
      items: [{title: '公告', contents: []}, {title: '提醒', contents: []}, {title: '消息', contents: []}]
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.$http.get('/notify')
    .then(response => {
      console.log(response.data.results.length)
      for (var i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i].notify.notify_type === 0) {
          var cons1 = changeTime(response.data.results[i].notify.create_timestamp) + ' ' + response.data.results[i].notify.content
          var con1 = {'con': ''}
          con1.con = cons1
          this.items[0].contents.push(con1)
        } else if (response.data.results[i].notify.notify_type === 1) {
          var cons2 = changeTime(response.data.results[i].notify.create_timestamp) + ' ' + response.data.results[i].notify.content
          var con2 = {'con': ''}
          con2.con = cons2
          this.items[1].contents.push(con2)
        } else if (response.data.results[i].notify.notify_type === 2) {
          var cons3 = changeTime(response.data.results[i].notify.create_timestamp) + ' ' + response.data.results[i].notify.content
          var con3 = {'con': ''}
          con3.con = cons3
          this.items[2].contents.push(con3)
        }
      }
    })
    var changeTime = function (time) {
      var d = new Date(time)
      var year = d.getFullYear()
      var month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
      var date = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
      var hours = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()
      var minute = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()
      return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
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
