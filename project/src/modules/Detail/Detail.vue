<template>
  <div id="detail">
    <navigation-bar @tap="scrollTop" title="书籍详情" ref="scroller" >
      <navigation-bar-item slot="left" icon="back" text="返回" @tap="back"/>
    </navigation-bar>
     <scroller style="flex-grow:1" ref="scroller" can-pull-refresh @pullRefresh="pullRefresh" @loadMore="loadMore" can-load-more>
        <div class="top">
          <Cover :info='info' />
        </div>
        <container></container>
        <div class="centerTop">
          <info :data="info.data" :update="update"/>
        <container></container>
          <relate :initialInfo='recommendInfo'/>
        </div>
        <container></container>
        <div class="bottom">
          <comment :comment='comment' @showComment="showCommentModal"/>
        </div>
    </scroller>
    <shop v-model="shopModalShow" @paySuccess="showMessage"></shop>
    <message v-model="messageShow" :message-text="messageText"></message>
    <modal v-model="commentModalShow">
        <div slot="header">
            评论此书
        </div>
        <div class="shop-modal">
            <div class="point">
                <p>打分：</p>
                <div class="star" v-for="star in sort(stars)" @click="mark(star.score)" >
                    <icon class="icon" name="light-star" v-show="star.light">
                    </icon>
                    <icon class="icon" name="dark-star" v-show="!star.light">
                    </icon>
                </div>

            </div>
            <div class="content">
                <touch><textarea name="name" rows="8"></textarea></touch>
            </div>
        </div>
    </modal>
    <bottom-bar>
      <bottom-bar-item  v-if="!isIn" text="+书架" icon="add" @tap="add"></bottom-bar-item>
      <bottom-bar-item  v-else text="-书架" icon="remove" @tap="remove"></bottom-bar-item>
      <bottom-bar-item  text="立即阅读" icon="read" class="center" ></bottom-bar-item>
      <bottom-bar-item  text="购买" icon="shop" @tap="shop"></bottom-bar-item>
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
  import Shop from './components/shop'
  import Message from '@/components/Message'
  import Modal from '@/components/Modal'
  import Container from '@/components/Container'
  import Icon from '@/components/Icon'
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
      Comment,
      Shop,
      Message,
      Container,
      Modal,
      Icon
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
        ],
        shopModalShow: false,
        messageShow: false,
        messageText: '',
        commentModalShow: false,
        stars: []
      }
    },
    mounted () {
      this.info = {
        title: '三生三世十里桃花',
        id: '7788',
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
        this.comment.push({author: 'sx', time: '2017-03-18 08:08', data: '评论评论我是评论评论评论我是评论评论评论我是评论评论评论我是评论评论评论我是评论评论评论我是评论', resNum: 122})
      }
      this.stars = [
        {score: 1, name: 'star', light: false},
        {score: 2, name: 'star', light: false},
        {score: 3, name: 'star', light: false},
        {score: 4, name: 'star', light: false},
        {score: 5, name: 'star', light: false}
      ]
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
            this.comment.push({author: 'sx', time: '2017-03-18 08:08', data: '评论评论我是评论', resNum: 122})
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
        var book = {'id': this.info.id, 'title': this.info.title, 'cover': this.info.cover, 'isEdit': false}
        this.$store.commit('add', book)
      },
      remove () {
        this.$store.commit('remove', this.info.id)
        console.log(this.isIn)
      },
      shop () {
        this.shopModalShow = true
      },
      showMessage (text) {
        this.messageText = text
        this.messageShow = true
      },
      showCommentModal () {
        this.commentModalShow = true
      },
      sort (arr) {
        return arr.slice().sort((item1, item2) => { return item1.score - item2.score })
      },
      mark (score) {
        for (let i = 0; i < this.stars.length; i++) {
          if (this.stars[i].score <= score) {
            this.stars[i].light = true
          } else {
            this.stars[i].light = false
          }
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
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
    background: #d3d3d3;
    height: 1px;
    margin-bottom: 10px;
  }
  .center{
    flex-grow: 1.5;
    background: #6bc4f5;
  }
  .container {
      height: 10px
  }
  .point {
      display: flex;
      justify-content: flex-start;
  }
  .star {
      width: 10%;
  }
  .content {
      width: 90%
      textarea {
          width: 100%;
      }

  }
</style>
