<template lang="html">
    <div id="comment-detail">
        <navigation-bar @tap="scrollTop" title="评论详情" ref="scroller" :border="!top">
          <navigation-bar-item slot="left" icon="back" text="返回" @tap="back"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" can-load-more v-model="top" can-load-more>
            <div class="main-comment">
                <div class="avatar">
                  <img :src="mainComment.user_avatar" style="width:100%">
                </div>

                <div class="bg">
                   <p class="author"> {{mainComment.user_nickname}} </p>
                   <p class="star" :style='{width:getStarWidth(mainComment.score)}'></p>
                </div>
                <div class="comment-content">
                    {{ mainComment.content }}
                </div>
            </div>
            <div class="divide">

            </div>
            <ul class="response-comment">
                <p class="comments-number">共 {{ mainComment.sub_comment_count }} 条回复</p>
                <touch v-for="res in subComment" :key="res.id">
                    <li>
                        <div class="avatar">
                          <img :src="res.user_avatar" style="width:100%">
                        </div>
                        <p>{{res.user_nickname}}</p>
                        <div class="time">
                            {{res.timestamp}}
                        </div>
                        <div class="texts">
                          <div>
                            {{res.content}}
                          </div>
                          <div class="longHr"></div>
                        </div>
                    </li>
                </touch>
            </ul>

        </scroller>
        <message v-model="messageShow" :message-text="messageText" :iconName="icon"></message>
        <bottom-bar>
          <textarea placeholder="回复" v-model="responseContent"></textarea>
          <touch class="confirm" @tap="confirm">回复</touch>
        </bottom-bar>
    </div>
</template>

<script>
import Scroller from '@/components/Scroller'
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import { BottomBar, BottomBarItem } from '@/components/BottomBar'
import Message from '@/components/Message'
export default {
  name: 'commentDetail',
  components: {
    Scroller,
    NavigationBar,
    NavigationBarItem,
    BottomBar,
    BottomBarItem,
    Message
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bookId: {
      type: Number,
      default: 1
    }
  },
  computed: {
    commentId () {
      return this.$route.query.id
    }
  },
  data () {
    return {
      mainComment: {},
      subComment: [],
      top: true,
      messageShow: false,
      messageText: '',
      icon: 'ok',
      responseContent: '',
      next: ''
    }
  },
  methods: {
    load () {
      let me = this
      me.$http.get('/bookshopping/comment/' + me.commentId)
      .then(response => {
        console.log('/bookshopping/comment/: ' + response)
        me.mainComment = response.data
        me.mainComment.timestamp = me.formatTime(me.mainComment.timestamp)
        me.mainComment.user_avatar = 'http://oott.me' + me.mainComment.user_avatar
      })
    },
    loadChilrenComment () {
      let me = this
      me.$http.get('/bookshopping/comment/' + me.commentId + '/children', {
        params: {
          page: 1,
          page_size: 10
        }
      })
      .then(response => {
        me.subComment = this.formatImg(response.data.results)
        for (let i = 0; i < me.subComment.length; i++) {
          me.subComment[i].timestamp = me.formatTime(me.subComment[i].timestamp)
        }
        me.next = response.data.next
        me.$refs.scroller.refresh()
      })
    },
    back () {
      this.clean()
      this.$router.go(-1)
    },
    scrollTop: function () {
      this.$refs.scroller.scrollTop()
    },
    loadMore (over) {
      let noMore = false
      if (this.next === null) {
        noMore = true
        over(noMore)
      } else {
        this.loadChilrenComment()
        over(noMore)
      }
    },
    getStarWidth: function (score) {
      return score * 20 + '%'
    },
    showMessage (icon, text) {
      this.messageShow = true
      this.icon = icon
      this.messageText = text
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
    formatTime (time) {
      let newTime = new Date(time)
      return newTime.getFullYear() + '-' + ('0' + (newTime.getMonth() + 1)).slice(-2) + '-' + (('0' + newTime.getDate()).slice(-2))
    },
    clean () {
      this.responseContent = ''
    },
    confirm () {
      let me = this
      if (this.$Keyboard) {
        this.$Keyboard.hide()
      }
      me.$http.post('/bookshopping/book/' + me.bookId + '/comment', {
        'content': this.responseContent,
        'parent_id': me.commentId
      }).then(response => {
        console.log('/bookshopping/' + response)
        this.clean()
        this.showMessage('ok', '回复成功！')
        this.loadChilrenComment()
      })
    }
  },
  mounted () {
    this.load()
    this.loadChilrenComment()
  }
}
</script>

<style lang="stylus" scoped>
#comment-detail {
    font-size: 15px;
    width: 100%;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    .main-comment {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: 20px;
        align-items: center;
        .bg{
          width: 93px;
          margin: 3% 5%;
          .author {
              font-weight: bold;
              font-size: 15px;
          }
          .star{
            display: inline-block;
            left: 0;
            top: 0;
            background: url(../Detail/png/star.png);
            height: 16px;
          }
        }
        .comment-content {
            width: 100%;
            word-wrap: break-word;
            word-break: normal;
        }
    }
    .divide {
        width: 100%;
        height: 15px;
        background-color: #efeff4;
    }
    .response-comment {
        margin: 20px;
        list-style: none;
        .comments-number {
            margin: 10px 0;
        }
        li {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center
            .avatar{
              width: 7%;
              margin: 4px;
            }
            p {
                font-size: 12px;
                width: 60%;
            }
            .time {
                font-size: 11px;
                color: #706f6f;
            }
        }
    }
    .avatar{
      width: 10%;
      margin: 5px;
    }
    .longHr{
      background: #d3d3d3;
      height: 1px;
      margin-bottom: 10px;
      width: 200%;
      margin-left: -25%;
      margin-top: 10px;
    }
    .texts{
      display: flex;
      flex-direction: column;
      width: 90%;
      font-size: 12px;

    }
    .res {
        font-size: 10px;
        color: #706f6f;
        display: flex;
        align-items: center;
        .icon {
            width: 15px;
            padding: 2px;
        }
    }
    .bottom-bar {
        display: flex
        justify-content: space-between
        textarea {
            box-sizing: border-box;
            width: 85%;
            border: none;
            outline: none;
            resize: none;
            background-color: #efeff4;
            font-size: 15px
            padding: 10px;
            min-height: 33px
            max-height: 60px
        }
        .confirm {
            text-align: center
            box-sizing: border-box;
            width: 15%;
            line-height: 49px;
        }
    }
}
</style>
