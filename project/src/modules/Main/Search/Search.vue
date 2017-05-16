<template>
  <router-content style="flex-direction:column;background:#fff">
  <navigation-bar :border="!top">
    <icon name="search" class="icon"></icon>
    <input v-model="message" placeholder="书名/作者">
    <touch @tap="search"><span class="search">{{search}}</span></touch>
  </navigation-bar>
  <scroller ref="scroller" @loadMore="loadMore" v-model="top" can-load-more>
  <aside>
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
    <ul class="result">
      <touch @tap="toBookDetail()">
      <li v-for="book in bookData" :key="book.id">
        <div class="book-img"><img :src="book.img" :alt="book.name"></div>
        <div class="book-info">
          <p class="book-name">{{book.name}}</p>
          <p class="book-author">{{book.author}}</p>
          <p class="book-introduction">{{book.introduction}}</p>
        </div>
      </li>
      </touch>
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
    ActionSheetButton
  },
  data () {
    return {
      message: '',
      search: '搜索',
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
      show: false,
      bookData: [
        {id: 1, name: '摆渡人', price: 23.40, author: '克莱儿·麦克福尔', img: 'http://img13.360buyimg.com/n3/jfs/t1393/113/77737149/217635/9064dd42/555408dbN8679b564.jpg', introduction: '单亲女孩迪伦，15岁的她，世界却一片狼藉：与母亲总是无话可说，在学校里经常受到同学的捉弄，唯一谈得来的好友也因为转学离开了。这一切都让迪伦感到无比痛苦。她决定去看望久未谋面的父亲，然而，路上突发交通事故。等她拼命爬出火车残骸之后，却惊恐地发现，自己好像是唯一的幸存者，而眼前，竟是一片荒原。此时，迪伦看到不远处的山坡有上一个男孩的身影。男孩将她带离了事故现场。但是，迪伦很快意识到，男孩并不是偶然出现的路人，他似乎是特意在此等候。命运，从他们相遇的那刻开始，发生了无法预料的转变。'},
        {id: 2, name: '皮囊', price: 29.90, author: '蔡崇达', img: 'http://img13.360buyimg.com/n3/jfs/t526/8/239863987/140707/38421a9e/546d9a25N07687a60.jpg', introduction: '以人物肖像画的方式描绘了福建渔业小镇的风土人情和时代变迁，在温情而又残酷的故事讲述中阐述了作者对父母、家乡的缅怀，对朋友命运的关切。文集风格沉稳，表达了这一代理想膨胀却又深感现实骨感而无处安身的青年人对自己命运的深切思考。'},
        {id: 3, name: '朝花夕拾', price: 17.80, author: '鲁迅', img: 'http://img13.360buyimg.com/n3/jfs/t655/238/1195078491/109034/b41afb59/54bdf6e0Nf74bdaaf.jpg', introduction: '此文集作为“回忆的记事”，多侧面地反映了作者鲁迅青少年时期的生活，形象地反映了他的性格和志趣的形成经过。前七篇反映他童年时代在绍兴的家庭和私塾中的生活情景，后三篇叙述他从家乡到南京，又到日本留学，然后回国教书的经历；揭露了半封建半殖民地社会种种丑恶的不合理现象，同时反映了有抱负的青年知识分子在旧中国茫茫黑夜中，不畏艰险，寻找光明的困难历程，以及抒发了作者对往日亲友、师长的怀念之情。'},
        {id: 4, name: '我的心只悲伤七次', price: 22.60, author: '【黎】纪伯伦', img: 'http://img13.360buyimg.com/n3/g5/M02/14/11/rBEIC1ADeo4IAAAAAAGBNTPspiAAAEAzgGbRD8AAYFN108.jpg', introduction: '一本关于生命、艺术、爱情、人生的箴言书。论述了爱与美、生与死、婚姻与家庭、劳作与安乐、法律与自由、善恶与宗教等一系列人生和社会问题，充满比喻和哲理，具有浓郁的东方色彩。'}
      ]
    }
  },
  methods: {
    search () {
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
<style>
.scroller{
  flex-grow: 1;
  margin-bottom:49px;
}

input{
  width: 75%;
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
  height:120px;
  word-break: break-all;
  margin:0 30px 0 120px;
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
