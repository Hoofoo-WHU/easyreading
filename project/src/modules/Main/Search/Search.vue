<template>
  <router-content style="flex-direction:column;background:#fff">
  <navigation-bar>
    <icon name="search" class="icon"></icon>
    <input v-model="message" placeholder="书名/作者">
    <touch @tap="search"><span class="search">{{see}}</span></touch>
  </navigation-bar>
  <aside v-show="before">
    <div class="hot">
      <p>热门搜索</p>
      <ul>
        <li v-for="item in items" :keys="item.number">{{item.text}}</li>
      </ul>
    </div>
    <div class="history">
      <p>历史搜索</p>
      <ul>
        <li v-for="item1 in items1" :keys="item1.number">{{item1.text}}</li>
      </ul>
    </div>
  </aside>
  <scroller ref="scroller" @loadMore="loadMore" can-load-more>
    <ul class="result">
      <li v-for="book in bookData" :key="book.id">
      <touch @tap="toBookDetail()">
        <div class="book-img"><img :src="book.cover" :alt="book.title"></div>
        <div class="book-info">
          <p class="book-name">{{book.title}}</p>
          <p class="book-author">{{book.author}}</p>
          <p class="book-price">{{book.price}}个书币</p>
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
import {ActionSheet, ActionSheetItem, ActionSheetButton} from '@/components/ActionSheet'
import Container from '@/components/Container'
export default {
  name: 'search',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    ListItem,
    ActionSheet,
    ActionSheetItem,
    ActionSheetButton,
    Container
  },
  data () {
    return {
      message: '',
      see: '搜索',
      items: [
      {number: '1', text: '三生三世十里桃花'},
      {number: '2', text: '追风筝的人'},
      {number: '3', text: '摆渡人'},
      {number: '4', text: '皮囊'},
      {number: '5', text: '朝花夕拾'},
      {number: '6', text: '白夜行'},
      {number: '7', text: '嫌疑人X的献身'}
      ],
      items1: [
      {number: '1', text: '皮囊'},
      {number: '2', text: '追风筝的人'},
      {number: '3', text: '摆渡人'},
      {number: '4', text: '三生三世十里桃花'},
      {number: '5', text: '朝花夕拾'},
      {number: '6', text: '白夜行'},
      {number: '7', text: '嫌疑人'}
      ],
      bookData: [],
      before: true,
      after: false
    }
  },
  methods: {
    search () {
      if (this.see === '搜索') {
        this.$http.get('/bookshopping/book', {params: {search: this.message}})
        .then(response => {
          this.before = false
          this.after = true
          this.see = '取消'
          for (var i = 0; i < response.data.results.length; i++) {
            response.data.results[i].cover = 'http://oott.me' + response.data.results[i].cover
            this.bookData.push(response.data.results[i])
          }
        })
      } else {
        this.before = true
        this.after = false
        this.see = '搜索'
        this.message = ''
        this.bookData = []
      }
    },
    toBookDetail () {
      this.$router.push({'name': 'detail'})
    },
    loadMore (over) {
      console.log('loadMore')
    }
  }
}
</script>
<style scoped>
.scroller{
  flex-grow: 1;
  margin-bottom:49px;
}

input{
  width: 70%;
  margin: 5px 0 5px -25px;
  border-radius: 6px;
  border: none;
  background: none;
  background-color: #cccccc;
  padding-left:35px;
  opacity: 0.45;
  outline: none;
}

.icon{
  width:30px;
  height:30px;
  z-index:2;
  position: relative;
  top: 8px;
  left: 8px;
  color:grey;
}

.search{
  height: 48px;
  line-height: 48px;
  margin-left: 10px;
  color:grey;
}

aside{
}

.hot{
  margin:0 0 10px 0;
  background-color:rgb(247,247,247);
  padding:10px 20px;
  color:grey;
}
aside p{
  height:40px;
  line-height: 40px;
  font-size:18px;
  color:#b35c44;
}

aside li{
  display:inline-block;
  margin:5px 10px;
  padding:5px;
}

.history{
  background-color:rgb(247,247,247);
  padding:10px 20px;
  color:grey;
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
  height:90px;
  word-break: break-all;
  margin:0 30px 0 130px;
  padding: 15px 0;
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
