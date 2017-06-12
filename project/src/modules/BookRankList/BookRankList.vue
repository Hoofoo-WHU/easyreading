<template lang="html">
    <div id="book-rank-list">
        <navigation-bar @tap="" title="排行列表" :border="!top">
          <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" v-model="top" can-load-more>
            <ul>
                <li v-for="book in bookList" :key="book.id">
                    <div class="book-img">
                        <touch @tap="toBookDetail(book.id)">
                        <img :src=" book.cover " :alt=" book.title ">
                        </touch>
                    </div>
                    <div class="book-info">
                        <p class="book-title">{{ book.title }}</p>
                        <p class="book-author">{{ book.author }}</p>
                        <div class="operate">
                            <touch class="addShelf" @tap="add(book)">
                                <icon class="icon" :name="'addShelf'"></icon>
                            </touch>
                            <touch class="addCart" @tap="shop(book.title, book.price, book.id)">
                                <icon :name="'addCart'"></icon>
                            </touch>
                        </div>
                    </div>
                    <div class="book-price">
                      {{ book.price }} 书币
                    </div>
                </li>
            </ul>
        </scroller>
        <!--购买框-->
        <modal v-model="shopModalShow" :on-ok="confirmShop" :ok-text="'确认支付'">
          <div slot="header">
              购买本书
          </div>
          <div class="shop-modal">
              <p class="title">{{ shopBook.name }}</p>
              <p class="price">价格：<span>{{ shopBook.price }}</span>代币</p>
              <p class="hold">您还剩余 <span>{{ userHold }}</span>阅币</p>
          </div>
        </modal>
        <!--购买框结束-->
        <message v-model="messageShow" :message-text="messageText" :icon-name="messageIcon"></message>
    </div>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Scroller from '@/components/Scroller'
import Icon from '@/components/Icon'
import Modal from '@/components/Modal'
import Message from '@/components/Message'
export default {
  name: 'bookRankList',
  components: {
    NavigationBar,
    NavigationBarItem,
    Icon,
    Scroller,
    Message,
    Modal
  },
  data () {
    return {
      bookList: [],
      shopModalShow: false,
      messageShow: false,
      shopBook: {
        name: '',
        price: 0,
        id: 0
      },
      userHold: 0,
      messageText: '',
      messageIcon: 'ok',
      top: true,
      next: ''
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
    load () {
      this.$http.get('/recommendation/rank')
      .then(response => {
        this.bookList = this.formatImg(response.data.results)
        this.next = response.data.next
      })
    },
    formatImg (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = 'http://139.224.112.83' + arr[i].cover
      }
      return arr
    },
    isIn (id) {
      let books = this.$store.state.books
      for (let i = books.length - 1; i >= 0; i--) {
        if (id === books[i].id) {
          return true
        }
      }
      return false
    },
    back () {
      this.$router.go(-1)
    },
    loadMore (over) {
      let noMore = false
      if (this.next === null) {
        noMore = true
        over(noMore)
      } else {
        this.$http.get('/recommendation/rank')
        .then(response => {
          this.bookList = this.formatImg(response.data.results)
          this.next = response.data.next
        })
      }
    },
    toBookDetail (id) {
      this.$router.push({'name': 'detail', query: {'id': id}})
    },
    add (book) {
      let me = this
      let data = {'id': book.id, 'title': book.name, 'cover': book.img, 'isEdit': false}
      if (this.isIn(data.id)) {
        this.showMessage('已添加', 'ok')
      } else {
        me.$store.commit('add', data)
        me.$http.post('/bookshelf', {
          'book_id': book.id
        })
        .then(response => {
          this.showMessage('添加成功', 'ok')
        })
      }
    },
    shop (name, price, id) {
      this.shopBook.name = name
      this.shopBook.price = price
      this.shopBook.id = id
      let me = this
      me.$http.get('/personal/balance')
      .then(response => {
        me.userHold = response.data.balance_book
        setTimeout(function () {
          me.shopModalShow = true
        }, 0)
      })
    },
    confirmShop () {
      this.shopModalShow = false
      let me = this
      me.$http.post('/bookshopping/book/' + this.shopBook.id + '/buy')
      .then(response => {
        alert('response')
        this.showMessage('购买成功', 'ok')
      })
      .catch(error => {
        this.showMessage(error.response.data.reason, 'close')
      })
    },
    showMessage (text, icon) {
      if (icon) {
        this.messageIcon = icon
      }
      this.messageText = text
      this.messageShow = true
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style lang="stylus" scoped>
#book-rank-list {
    font-size: 15px;
    width: 100%;
    background-color: #ffffff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
            padding: 10px 10px;
            border-bottom: 1px solid #d3d3d3;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            .rank-icon {
                width: 7%;
                font-size: 20px;
                margin: 12px;
            }
            .book-img {
                width: 30%
                img {
                    width: 58%;
                }
            }
            .book-info{
                font-size: 12px;
                width: 50%;
                p {
                    margin-left: 10px;
                }
                .book-title {
                    font-weight: bold;
                    font-size: 14px;
                }
                .operate {
                    display: flex;
                    justify-content: flex-start;
                    .addShelf {
                        margin-right: 5px
                        width: 18px
                        padding: 10px
                    }
                    .addCart {
                        width: 18px
                        padding: 10px
                    }
                }
            }
            .book-price {
                font-size: 12px;
                color: #ffa500
            }
        }
    }
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
        margin: 10px
        font-size: 13px;
        span{
            color: #ffa500
            padding: 0 5px
        }
    }
}
</style>
