<template>
  <div id="detail">
    <navigation-bar @tap="scrollTop" title="书籍详情" ref="scroller" >
      <navigation-bar-item slot="left" icon="back" text="返回" @tap="back"/>
    </navigation-bar>
     <scroller style="flex-grow:1" ref="scroller" can-pull-refresh @pullRefresh="pullRefresh" @loadMore="loadMore" can-load-more>
        <div class="top">
          <Cover :info='info' />
        </div>
        <div class="space"></div>
        <div class="centerTop">
          <info :data="info.data" :update="update"/>
          <div class="space"></div>
          <relate :initialInfo='recommendInfo'/>
        </div>
        <div class="space"></div>
        <div class="bottom">
          <comment :comment='comment'/>
        </div>
    </scroller>
    <bottom-bar>
      <bottom-bar-item  v-if="!isIn" text="+书架" icon="add" @tap="add"></bottom-bar-item>
      <bottom-bar-item  v-else text="-书架" icon="remove" @tap="remove"></bottom-bar-item>
      <bottom-bar-item  text="立即阅读" icon="read" class="center" ></bottom-bar-item>
      <bottom-bar-item  text="下载" icon="downLoad"></bottom-bar-item>
    </bottom-bar>
  </div>
</template>

<script>
  import Scroller from '@/components/Scroller'
  import { BottomBar, BottomBarItem } from '@/components/BottomBar'
  import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
  import Cover from './components/Cover'
  import Info from './components/Info'
  import Relate from './components/relate'
  import Comment from './components/comment'

  export default {
    name: 'detail',
    components: {
      BottomBar,
      BottomBarItem,
      NavigationBar,
      NavigationBarItem,
      Scroller,
      Cover,
      Info,
      Relate,
      Comment
    },
    data () {
      return {
        info: {
        },
        update: {
        },
        recommendInfo: [
        ],
        comment: [
        ]
      }
    },
    mounted () {
      this.info = {
        title: '三生三世十里桃花',
        id: '8877',
        author: '唐七',
        data: '那一世，大荒之中一处荒山，成就她与他的初见。桃花灼灼，枝叶蓁蓁，妖娆伤眼。记忆可以封存，可心有时也会背叛，忘得了前世情缘，忘不了桃林十里，亦忘不了十里桃林中玄衣的少年。这一世，东海水晶宫，他们不期而遇。不是每个人都能看透这三生三世的爱恨交织，只要你还在，只要我还爱，那么，这世间，刀山火海，毫不畏惧。有些爱，藏在嘴边，挂在心尖。浮生若梦，情如流水，爱似桃花……',
        cover: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2619242940,2733301503&fm=58',
        price: 600,
        score: 10}
      this.update = {
        time: '2017-03-18 08:08',
        chapter: 'xxxx章  xxxx'
      }
      for (let i = 1; i <= 3; i++) {
        this.recommendInfo.push({cover: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2619242940,2733301503&fm=58',
          title: '三生三世十里桃花'})
      }
      for (let i = 1; i <= 10; i++) {
        this.comment.push({author: 'sx', time: '2017-03-18 08:08', data: '评论评论我是评论评论评论我是评论评论评论我是评论评论评论我是评论评论评论我是评论评论评论我是评论'})
      }
    },
    computed: {
      isIn () {
        var books = this.$store.state.books
        for (let i = books.length - 1; i >= 0; i--) {
          if (this.info.id === books[i].id) {
            return true
          }
        }
        return false
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      scrollTop: function () {
        this.$refs.scroller.scrollTop()
      },
      pullRefresh (over) {
        console.log('pullRefresh')
        setTimeout(over, 3000)
      },
      loadMore (over) {
        console.log('loadMore')
        setTimeout(() => {
          var noMore = false
          var i = this.comment.length
          var end = i + 10
          console.log(this.comment.length)
          for (; i < end; i++) {
            this.comment.push({author: 'sx', time: '2017-03-18 08:08', data: '评论评论我是评论'})
          }
          if (i > 100) {
            noMore = true
          }
          over(noMore)
        }, 2000)
      },
      test () {
        alert('可以')
      },
      add () {
        var book = {'id': this.info.id, 'title': this.info.title, 'cover': this.info.cover}
        this.$store.commit('add', book)
      },
      remove () {
        this.$store.commit('remove', this.info.id)
        console.log(this.isIn)
      }
    }
  }
</script>
<style lang="css" scoped>
  #detail{
    width: 100%;
    background: #efeff4;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
  }
  .top{
    display: flex;
    flex-direction: column ;
    font-size: 12px;
  }
  .space{
    height: 5px;
    background: white;
  }
  .centerTop{
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding-top: 10px;
  }
  .bottom{
    font-size: 12px;
  }
  .hr{
    background: gray;
    height: 1px;
    margin-bottom: 10px;
  }
  .center{
    flex-grow: 1.5;
    background: #6bc4f5;
  }
</style>
