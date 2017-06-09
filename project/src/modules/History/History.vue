<template>
<router-content style="flex-direction:column;background:#fff">
    <navigation-bar title="阅读历史">
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
  name: 'history',
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
    this.$http.get('/personal/read')
    .then(response => {
      for (var i = 0; i < response.data.results.length; i++) {
        response.data.results[i].cover = 'http://139.224.112.83' + response.data.results[i].cover
        this.items.push(response.data.results[i])
      }
    })
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
  height:60px;
  line-height:60px;
  color:#b35c44;
}
.book-author{
  height:60px;
  line-height:60px;
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
