<template>
  <router-content style="flex-direction:column;background:#fff">
    <navigation-bar title="账单">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <list-item v-for="(item,index) in items" :key="index" :text="item" style="height:53px;line-height:53px"></list-item>
    </scroller>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import ListItem from '@/components/ListItem'

export default {
  name: 'bill',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
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
    }
  },
  mounted () {
    this.$http.get('/personal/deposit')
    .then(response => {
      for (var i = 0; i < response.data.results.length; i++) {
        var amount = response.data.results[i].amount
        var time = response.data.results[i].modify_timestamp
        var timedate = changeTime(time)
        this.items.push(timedate + ' 花费' + amount + '元 充值' + amount * 100 + '书币')
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
</style>
