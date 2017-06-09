<template>
<router-content style="flex-direction:column;background:#fff">
    <navigation-bar title="已购书籍">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <ul class="result">
      <li v-for="item in items" :key="item.id">
      <touch @tap="toBookDetail()">
        <div class="book-img"><img :src="item.cover" :alt="item.title"></div>
        <div class="book-info">
          <p class="book-name">{{item.title}}</p>
          <p class="book-author">{{item.author}}</p>
          <p class="book-price">{{item.price}}个书币</p>
          <p class="book-time">购买时间：{{item.timestamp}}</p>
        </div>
      </touch>
      </li>
    </ul>
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
  name: 'list',
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
    },
    toBookDetail () {
      this.$router.push({'name': 'detail'})
    }
  },
  mounted () {
    this.$http.get('/personal/buying')
    .then(response => {
      for (var i = 0; i < response.data.results.length; i++) {
        response.data.results[i].cover = 'http://139.224.112.83' + response.data.results[i].cover
        response.data.results[i].timestamp = changeTime(response.data.results[i].timestamp)
        this.items.push(response.data.results[i])
        console.log(this.items)
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
  margin-bottom:49px;
}
.result{
}
.result li{
  width:100%;
  height:120px;
  padding:10px;
  border-bottom:1px solid #ccc;
}
.book-img{
  width:120px;
  height:120px;
  float:left;
}
.book-img img{
  width:120px;
  height:120px;
}
.book-info{
  height:120px;
  word-break: break-all;
  margin:0 30px 0 130px;
}
.book-name{
  height:30px;
  line-height:30px;
  color:#b35c44;
}
.book-author{
  height:30px;
  line-height:30px;
  font-size:14px;
  color:#7c4b00;
}
.book-price{
  height:30px;
  line-height:30px;
  font-size:14px;
}
.book-time{
  height:30px;
  line-height:30px;
  font-size:14px;
}
.book-introduction{
  height:60px; 
  overflow:hidden; 
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height:30px;
  font-size:14px;
}
</style>
