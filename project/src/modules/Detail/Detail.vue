<template>
  <div id="detail">
    <navigation-bar @tap="scrollTop" title="书籍详情" ref="scroller" :border="!top">
      <navigation-bar-item slot="left" icon="back" text="返回" @tap="back"/>
    </navigation-bar>
     <scroller style="flex-grow:1" ref="scroller" can-pull-refresh @pullRefresh="pullRefresh" @loadMore="loadMore" can-load-more v-model="top">
        <div class="top">
          <Cover :info='info' />
        </div>
        <div class="centerTop">
            <info :data="info.introduction" :update="update"/>
            <div class="divider">
            </div>
            <relate :initialInfo='recommendInfo' @changePage="toBookDetail"/>
            <div class="divider">
            </div>
        </div>

        <div class="bottom">
            <comment :comment='comment' @showComment="showCommentModal" @showCommentDetail="toCommentDetail"/>
        </div>
    </scroller>
    <message v-model="messageShow" :message-text="messageText" :icon-name="messageIcon"></message>
    <!--评论详情-->
    <comment-detail v-model="commentDetailShow" :comment-id="commentId" :book-id="curId" @reloadComment="loadComment"></comment-detail>
    <!--评论框-->
    <add-comment v-model="addCommentShow" :id="info.id" @showMessage="showMessage" @reloadComment="loadComment"></add-comment>
    <!--购买框-->
    <modal v-model="shopModalShow" :on-ok="confirmShop" :ok-text="'确认支付'">
        <div slot="header">
            购买本书
        </div>
        <div class="shop-modal">
            <p class="title">{{ info.title }}</p>
            <p class="price">价格：<span>{{ info.price }}</span>书币</p>
            <p class="hold">您还剩余 <span>{{ userHold }}</span>书币</p>
        </div>
    </modal>
    <!--购买框结束-->
    <bottom-bar>
      <bottom-bar-item  v-if="!isIn" text="+书架" icon="add" @tap="add"></bottom-bar-item>
      <bottom-bar-item  v-else text="-书架" icon="remove" @tap="remove"></bottom-bar-item>
      <bottom-bar-item  text="立即阅读" class="center" @tap="read(info.id)"></bottom-bar-item>
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
  import AddComment from './components/AddComment'
  import CommentDetail from './components/CommentDetail'
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
      AddComment,
      CommentDetail,
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
        messageIcon: 'ok',
        userHold: 0,
        addCommentShow: false,
        top: true,
        commentDetailShow: false,
        commentId: 1,
        curId: 1
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
      },
      bookId () {
        if (this.$route.query.id) {
          console.log(this.$route.query.id)
          return this.$route.query.id
        }
      }
    },
    watch: {
      shopModalShow (val) {
        if (val) {
          this.$store.commit('addmodal', () => { this.shopModalShow = true })
        } else {
          this.$store.commit('removemodal', () => { this.shopModalShow = false })
        }
      }
    },
    methods: {
      load (id) {
        let me = this
        me.$http.get('/bookshopping/book/' + id)
        .then(response => {
          console.log('/bookshopping/book/: ' + response)
          me.info = response.data
          me.info.cover = 'http://oott.me' + me.info.cover
          me.update.time = me.info.update_timestamp
          me.update.chapter = me.info.latest_chapter_text
          this.$refs.scroller.refresh()
        })
        me.$http.get('/recommendation/individuation', {
          params: {
            amount: 10
          }
        })
        .then(response => {
          me.recommendInfo = me.formatImg(response.data.results)
          this.$refs.scroller.refresh()
        })
        .catch(error => {
          console.log(error.response)
        })
        this.loadComment()
      },
      loadComment () {
        let me = this
        me.$http.get('/bookshopping/book/' + this.curId + '/comment', {
          params: {
            page: 1,
            page_size: 20
          }
        })
        .then(response => {
          me.comment = this.formatImg(response.data.results)
          this.$refs.scroller.refresh()
        })
      },
      formatImg (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].user_avatar) {
            arr[i].user_avatar = 'http://oott.me' + arr[i].user_avatar
          } else if (arr[i].cover) {
            arr[i].cover = 'http://oott.me' + arr[i].cover
          }
        }
        return arr
      },
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
        let me = this
        console.log('loadMore')
        setTimeout(() => {
          let noMore = false
          me.loadComment()
          over(noMore)
        }, 2000)
      },
      test () {
        alert('可以')
      },
      add () {
        let me = this
        let data = {'id': this.info.id, 'title': this.info.title, 'cover': this.info.cover, 'isEdit': false}
        if (this.isIn) {
          this.showMessage('已添加', 'ok')
        } else {
          me.$store.commit('add', data)
          me.$http.post('/bookshelf', {
            'book_id': this.info.id
          })
          .then(response => {
            this.showMessage('添加成功', 'ok')
          })
        }
      },
      remove () {
        this.$store.commit('remove', this.info.id)
        console.log(this.isIn)
      },
      read (id) {
        if (this.info.allow_trial === false) {
          this.showMessage('请先购买后阅读', 'close')
        } else {
          this.$router.push({'name': 'read', 'query': {id}})
        }
      },
      shop () {
        let me = this
        me.$http.get('/personal/balance')
        .then(response => {
          me.userHold = response.data.balance_book
          setTimeout(function () {
            me.shopModalShow = true
          }, 0)
        })
      },
      showMessage (text, icon) {
        if (icon) {
          this.messageIcon = icon
        }
        this.messageText = text
        this.messageShow = true
      },
      showCommentModal () {
        this.addCommentShow = true
      },
      confirmShop () {
        this.shopModalShow = false
        let me = this
        me.$http.post('/bookshopping/book/' + this.info.id + '/buy')
        .then(response => {
          this.showMessage('购买成功', 'ok')
        })
        .catch(error => {
          this.showMessage(error.response.data.reason, 'close')
        })
      },
      toBookDetail (id) {
        console.log(id)
        this.curId = id
        this.load(id)
      },
      toCommentDetail (id) {
        this.commentDetailShow = true
        this.commentId = id
      }
    },
    mounted () {
      this.curId = this.bookId
      this.load(this.bookId)
      console.log('refresh')
    },
    activated () {
      console.log('acti')
      console.log('activated')
    }
  }
</script>
<style lang="stylus" scoped>
  #detail{
    width: 100%;
    display: flex;
    background-color: #fff;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
  }
  .top{
    background: #efeff4;
    display: flex;
    flex-direction: column ;
    font-size: 12px;
  }
  .centerTop{
    display: flex;
    flex-direction: column;
    font-size: 12px;
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
    background: #157afb;
    color: #fff;
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
  .divider {
      height: 20px;
      width: 100%;
      background-color: #efeff4;
  }
  .shop-modal {
      .title {
          text-align: center;
          font-size: 15px;
          font-weight: bold;
      }
      .price {
          font-size: 13px;
          margin: 10px
          span {
              color: #ffa500
              padding: 0 5px
          }
      }
      .hold {
          font-size: 13px;
          margin: 10px
          span{
              color: #ffa500
              padding: 0 5px
          }
      }
  }
</style>
