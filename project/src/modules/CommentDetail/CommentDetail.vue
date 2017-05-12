<template lang="html">
    <div id="comment-detail">
        <navigation-bar @tap="scrollTop" title="评论详情" ref="scroller" :border="!top">
          <navigation-bar-item slot="left" icon="back" text="返回" @tap="back"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" can-load-more v-model="top" can-load-more>
            <div class="main-comment">
                <div class="avatar">
                  <img src="../Detail/png/avatar.png" style="width:100%">
                </div>

                <div class="bg">
                   <p class="author"> {{user.name}} </p>
                   <p class="star" :style='{width:getStarWidth(user.score)}'></p>
                </div>
                <div class="comment-content">
                    {{ user.comment }}
                </div>
            </div>
            <div class="divide">

            </div>
            <ul class="response-comment">
                <p class="comments-number">共 {{ user.res.content.length }} 条回复</p>
                <li v-for="res in user.res.content">
                    <div class="avatar">
                      <img src="../Detail/png/avatar.png" style="width:100%">
                    </div>
                    <p>{{res.name}}</p>
                    <div class="time">
                        {{res.time}}
                    </div>
                    <div class="texts">
                      <div>
                        {{res.text}}
                      </div>
                      <div class="longHr"></div>
                    </div>
                </li>

            </ul>

        </scroller>
    </div>

</template>

<script>
import Scroller from '@/components/Scroller'
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
export default {
  name: 'commentDetail',
  components: {
    Scroller,
    NavigationBar,
    NavigationBarItem
  },
  data () {
    return {
      user: {
        name: 'sads',
        score: 7,
        comment: 'sjsjsjsjsjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
        time: '2014-09-08 22:12',
        res: {
          content: [
            {name: '南街', text: '吃大亏尽可能地卡包的会计师', time: '2014-09-08 22:12'},
            {name: '呆呆兽', text: 'sasacdadccdcasxamknkjfyvnbfytdggf', time: '2014-09-08 22:12'},
            {name: 'CDK未', text: '代码卡拉拉逗你玩就问你检测技术看完了我城南街道', time: '2014-09-08 22:12'},
            {name: 'xsx', text: 'msmsasw能吃苦的斯诺克传闻弗兰克', time: '2014-09-08 22:12'},
            {name: '南街', text: '吃大亏尽可能地卡包的会计师', time: '2014-09-08 22:12'},
            {name: '呆呆兽', text: 'sasacdadccdcasxamknkjfyvnbfytdggf', time: '2014-09-08 22:12'},
            {name: 'CDK未', text: '代码卡拉拉逗你玩就问你检测技术看完了我城南街道', time: '2014-09-08 22:12'},
            {name: 'xsx', text: 'msmsasw能吃苦的斯诺克传闻弗兰克', time: '2014-09-08 22:12'},
            {name: '南街', text: '吃大亏尽可能地卡包的会计师', time: '2014-09-08 22:12'},
            {name: '呆呆兽', text: 'sasacdadccdcasxamknkjfyvnbfytdggf', time: '2014-09-08 22:12'},
            {name: 'CDK未', text: '代码卡拉拉逗你玩就问你检测技术看完了我城南街道', time: '2014-09-08 22:12'},
            {name: 'xsx', text: 'msmsasw能吃苦的斯诺克传闻弗兰克', time: '2014-09-08 22:12'}
          ]
        }
      },
      top: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    scrollTop: function () {
      this.$refs.scroller.scrollTop()
    },
    loadMore (over) {
      console.log('loadMore')
    },
    getStarWidth: function (score) {
      return score * 10 + '%'
    }
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
}
</style>
