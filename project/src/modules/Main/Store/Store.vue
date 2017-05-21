<template>
  <router-content style="flex-direction:column">
    <navigation-bar @tap="scrollTop" title="书城" ref="scroller" >
    </navigation-bar>
    <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" can-load-more >
      <slider @tap="sliderAction"></slider>
      <container :title="'分类'" :more="false" :divider="true">
          <div class="category">
              <div class="section-content">
                  <div class="type" v-for="icon in categoryIcon" :key="icon.id">
                    <touch @tap="toBookCategoryList(icon.id)">
                      <div class="icon-border">
                          <icon class="icon" :name="icon.name"></icon>
                      </div>
                      <span> {{ icon.text }} </span>
                    </touch>
                  </div>
              </div>
          </div>
      </container>


      <!--排行榜-->
      <container :title="'排行榜'" :more="false" :divider="true">
          <div class="rank-list">
              <div class="section-content">
                  <ul class="book-show" >
                      <touch v-for="book in rankList" :key="book.id" @tap="toBookDetail(book.id)">
                      <li>
                          <div class="book-img">
                              <img :src="book.cover" :alt="book.title">
                          </div>
                          <p>{{ book.title }}</p>
                      </li>
                    </touch>
                  </ul>
                  <div class="see-more">
                  <touch @tap="toBookRankList">
                   更多>>>
                  </touch>
                  </div>
              </div>
          </div>
      </container>


      <!--个性化推荐-->
      <container :title="'个性推荐'" :more="false">
          <div class="per-recommand">
              <div class="section-content">
                  <ul class="book-show" >
                      <touch  class="book-border" v-for="book in recommendList" @tap="toBookDetail(book.id)" :key="book.id">
                      <li>
                          <div class="book-img">
                              <img :src=" book.cover " :alt=" book.title ">
                          </div>
                          <div class="book-info">
                              <p>{{ book.title }}</p>
                              <div class="book-price">
                                 {{ book.price }} 书币
                              </div>
                          </div>

                      </li>
                      </touch>

                  </ul>

              </div>
          </div>
      </container>
      <modal v-model="modalShow"></modal>
      <message v-model="messageShow" :message-text="'购买成功'"></message>

    </scroller>
  </router-content>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import RouterContent from '@/components/RouterContent'
import Scroller from '@/components/Scroller'
import Icon from '@/components/Icon'
import Slider from '@/components/Slider'
import Modal from '@/components/Modal'
import Message from '@/components/Message'
import Container from '@/components/Container'

export default {
  name: 'store',
  data () {
    return {
      modalShow: false,
      messageShow: false,
      msg: '这里是商城模块',
      categoryIcon: [
        {id: 1, name: 'dog', text: '少儿幼教'},
        {id: 2, name: 'library', text: '教育科技'},
        {id: 3, name: 'musicbox', text: '文学艺术'},
        {id: 4, name: 'computer', text: '经管职场'},
        {id: 5, name: 'plane', text: '党政军事'},
        {id: 6, name: 'xbox', text: '时尚娱乐'},
        {id: 7, name: 'rose', text: '情感家庭'},
        {id: 8, name: 'newspaper', text: '人文社科'}
      ],
      recommendList: [],
      rankList: [],
      nextRecommand: ''
    }
  },
  components: {
    NavigationBar,
    NavigationBarItem,
    Scroller,
    RouterContent,
    Icon,
    Slider,
    Modal,
    Message,
    Container
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    scrollTop: function () {
      this.$refs.scroller.scrollTop()
    },
    loadMore (over) {
      let me = this
      console.log('loadMore')
      setTimeout(() => {
        let noMore = false
        me.$http.get('/recommendation/individuation', {
          params: {
            amount: 10
          }
        })
        .then(response => {
          me.recommendList = me.formatImg(response.data.results)
          over(noMore)
          this.$refs.scroller.refresh()
        })
        .catch(error => {
          console.log(error.response.data.message)
          over(noMore)
          this.$refs.scroller.refresh()
        })
      }, 2000)
    },
    replace (name, id) {
      this.$router.push({'name': name, params: {'id': id}})
    },
    toBookCategoryList (id) {
      this.replace('bookCategoryList', id)
    },
    toBookRankList () {
      this.replace('bookRankList')
    },
    toBookDetail (id) {
      this.replace('detail', id)
    },
    sliderAction (id) {
      console.log(id)
    },
    formatImg (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = 'http://oott.me' + arr[i].cover
      }
      return arr
    },
    load () {
      this.$http.get('/recommendation/individuation', {
        params: {
          amount: 10
        }
      })
      .then(response => {
        this.recommendList = this.formatImg(response.data.results)
        this.nextRecommand = response.data.next
        this.$refs.scroller.refresh()
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
      this.$http.get('/recommendation/rank', {
        params: {
          amount: 4
        }
      })
      .then(response => {
        this.rankList = this.formatImg(response.data.results)
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  },
  activated () {
    this.load()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.category {
    .section-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        height: 70%
        .type {
            width: 25%;
            font-size: 10px;
            text-align: center;
            line-height: 40px;
            box-sizing: border-box;
            .icon-border {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px #d3d3d3 solid;
                position: relative;
                margin: 0 auto;
            }
            .icon {
                position: absolute;
                top: 50%;
                left: 50%
                transform: translate(-50%, -50%);
                width: 75%;
            }
            span {
                vertical-align: super;
            }
        }
    }
}
.rank-list {
    .section-content {
        padding: 10px 0;
        .book-show {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex
            justify-content: space-around;
            div {
                width: 25%;
                box-sizing: border-box;
                padding: 10px;
                li {
                    .book-img {
                        width: 100%
                        height: 100%
                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }

                    p {
                        font-size: 10px;
                        text-align: center;
                    }
                }
            }
        }
        .see-more {
            width: 30%;
            height: 20px;
            border: 1px #d3d3d3 solid
            border-radius: 50px;
            text-align: center;
            font-size: 10px;
            margin: 10px auto;
            line-height: 20px;
        }
    }
}
.per-recommand {
    .section-content {
        height: 70%;
        .book-show {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            .book-border {
                width: 50%;
                box-sizing: border-box;
                li {
                    margin: 0;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    .book-img {
                        width: 40%;
                        height: 100%
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .book-info {
                        width: 35%;
                        padding: 0 4px 0 8px;
                        font-size: 12px;
                        flex-grow: 2;
                    }
                    .book-price {
                        font-size: 9px;
                        color: #ffa500
                    }
                }
            }

        }
    }
}

</style>
